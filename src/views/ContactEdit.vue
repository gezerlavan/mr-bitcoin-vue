<template>
    <section v-if="contact" class="contact-edit">
        <form
            @submit.prevent="onSaveContact"
            @change="contact._id && onSaveContact"
        >
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
            <button v-if="!contact._id">Save</button>
        </form>
        <div class="actions">
            <RouterLink to="/contact"><button>Back</button></RouterLink>
            <button v-if="contact._id" @click="removeContact">Delete</button>
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
        async removeContact() {
            try {
                await contactService.deleteContact(this.contact._id)
                showSuccessMsg(`Removed contact ${this.contact._id}`)
            } catch (error) {
                showErrorMsg("Couldn't remove")
            } finally {
                this.$router.push('/contact')
            }
        },
        test() {
            console.log('Hi')
        },
        async onSaveContact() {
            try {
                const contact = await contactService.saveContact(this.contact)
                showSuccessMsg(`Added contact ${contact._id}`)
            } catch (error) {
                showErrorMsg("Couldn't remove")
            } finally {
                this.$router.push('/contact')
            }
        },
    },
    async created() {
        const { id: contactId } = this.$route.params
        this.contact = contactId
            ? await contactService.getContactById(contactId)
            : contactService.getEmptyContact()
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
