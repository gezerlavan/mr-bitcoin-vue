<template>
    <section v-if="contact" class="contact-edit">
        <form @submit.prevent="onSaveContact">
            <input
                v-model="contact.name"
                type="text"
                placeholder="Enter name"
            />
            <input
                v-model="contact.email"
                type="email"
                placeholder="Enter email"
            />
            <input
                v-model="contact.phone"
                type="phone"
                placeholder="Enter phone number"
            />
            <button>Save</button>
        </form>
        <div class="actions">
            <RouterLink to="/contact"><button>Back</button></RouterLink>
            <button v-if="contact._id" @click="onRemoveContact">Delete</button>
        </div>
        <pre>{{ contact }}</pre>
    </section>
    <p v-else>Loading...</p>
</template>

<script>
import { contactService } from '@/services/contactService'
import { showErrorMsg, showSuccessMsg } from '@/services/eventBus.service'

export default {
    data() {
        return {
            contact: null,
        }
    },
    methods: {
        async onRemoveContact() {
            try {
                await this.$store.dispatch({
                    type: 'removeContact',
                    contactId: this.contact._id,
                })
                showSuccessMsg(`Removed contact ${this.contact._id}`)
            } catch (error) {
                showErrorMsg("Couldn't remove")
            } finally {
                this.$router.push('/contact')
            }
        },
        async onSaveContact() {
            try {
                const savedContact = await contactService.saveContact(this.contact)
                showSuccessMsg(`Added contact ${savedContact._id}`)
            } catch (error) {
                showErrorMsg("Couldn't save")
            } finally {
                this.$router.push('/contact')
            }
        },
    },
    async created() {
        const { id: contactId } = this.$route.params
        const contact = contactId
            ? await contactService.getContactById(contactId)
            : contactService.getEmptyContact()
        this.contact = { ...contact }
    },
}
</script>

<style lang="scss">
.contact-edit {
    display: grid;
    justify-content: center;
    gap: 0.5em;

    form {
        display: grid;
        gap: 0.5em;
    }

    .actions {
        display: flex;
        gap: 0.5em;
    }
}
</style>
