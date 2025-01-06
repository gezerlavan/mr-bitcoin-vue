<template>
    <section v-if="contacts" class="contact-index">
        <ContactList :contacts="contacts" @remove="removeContact" />
    </section>
</template>

<script>
import ContactList from '@/components/ContactList.vue'
import { contactService } from '@/services/contactService'

export default {
    data() {
        return {
            contacts: null,
        }
    },
    methods: {
        async loadContacts() {
            this.contacts = await contactService.getContacts()
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
    },
    created() {
        this.loadContacts()
    },
    components: {
        ContactList,
    },
}
</script>

<style lang="scss"></style>
