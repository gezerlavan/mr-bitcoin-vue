import { contactService } from '@/services/contactService'

export default {
    state() {
        return {
            contacts: null,
        }
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(c => c._id === contactId)
            state.contacts.splice(idx, 1)
        },
    },
    getters: {
        contacts(state) {
            return state.contacts
        },
    },
    actions: {
        async loadContacts({ commit }, { filterBy }) {
            const contacts = await contactService.getContacts(filterBy)
            commit({ type: 'setContacts', contacts })
        },
        async removeContact({ commit }, { contactId }) {
            await contactService.deleteContact(contactId)
            commit({ type: 'removeContact', contactId })
        },
    },
}
