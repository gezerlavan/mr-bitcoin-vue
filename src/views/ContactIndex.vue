<template>
    <section v-if="contacts" class="contact-index">
        <ContactList :contacts="contacts" />
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
