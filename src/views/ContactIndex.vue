<template>
    <section v-if="contacts" class="contact-index">
        <ContactFilter @filter="setFilterBy" />
        <RouterLink to="/contact/edit">
            <button>Add contact</button>
        </RouterLink>
        <ContactList :contacts="contacts" @remove="removeContact" />
    </section>
    <p v-else>Loading...</p>
</template>

<script>
import ContactFilter from '@/components/ContactFilter.vue'
import ContactList from '@/components/ContactList.vue'
import { contactService } from '@/services/contactService'
import { showErrorMsg, showSuccessMsg } from '@/services/eventBus.service'

export default {
    data() {
        return {
            contacts: null,
        }
    },
    methods: {
        async loadContacts(filterBy = null) {
            this.contacts = await contactService.getContacts(filterBy)
        },
        async removeContact(contactId) {
            try {
                await contactService.deleteContact(contactId)

                const idx = this.contacts.findIndex(c => c._id === contactId)
                this.contacts.splice(idx, 1)
                showSuccessMsg(`Removed contact ${contactId}`)
            } catch (error) {
                showErrorMsg("Couldn't remove")
            }
        },
        setFilterBy(filterBy) {
            this.loadContacts(filterBy)
        },
    },
    created() {
        this.loadContacts()
    },
    components: {
        ContactList,
        ContactFilter,
    },
}
</script>

<style lang="scss">
.contact-index {
    display: grid;
}
</style>
