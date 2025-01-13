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
import { showErrorMsg, showSuccessMsg } from '@/services/eventBus.service'

export default {
    methods: {
        async loadContacts(filterBy = null) {
            this.$store.dispatch({ type: 'loadContacts', filterBy })
        },
        async removeContact(contactId) {
            try {
                await this.$store.dispatch({ type: 'removeContact', contactId })
                showSuccessMsg(`Removed contact ${contactId}`)
            } catch (error) {
                showErrorMsg("Couldn't remove")
            }
        },
        setFilterBy(filterBy) {
            this.loadContacts(filterBy)
        },
    },
    computed: {
        contacts() {
            return this.$store.getters.contacts
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

    a {
        justify-self: start;
    }
}
</style>
