<template>
    <section v-if="contacts" class="contact-index">
        <pre>{{ contacts }}</pre>
    </section>
</template>

<script>
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
}
</script>

<style lang="scss"></style>
