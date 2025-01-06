<template>
    <section class="car-index">
        <ContactFilter @filter="setFilterBy" />
        <section v-if="contacts" class="contact-index">
            <ContactList :contacts="contacts" @remove="removeContact" />
        </section>
        <p v-else>Loading...</p>
    </section>
</template>

<script>
import ContactFilter from '@/components/ContactFilter.vue'
import ContactList from '@/components/ContactList.vue'
import { contactService } from '@/services/contactService'

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
            } catch (error) {
                alert('Something went wrong removing')
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

<style lang="scss"></style>
