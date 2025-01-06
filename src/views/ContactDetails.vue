<template>
    <section v-if="contact" class="contact-details">
        <h2>{{ contact.name }}</h2>
        <img :src="`https://robohash.org/${contact._id}`" alt="" />
        <p>{{ contact.email }}</p>
        <p>{{ contact.phone }}</p>
        <RouterLink to="/contact">
            <button>Back</button>
        </RouterLink>
    </section>
    <p v-else>Loading...</p>
</template>

<script>
import { contactService } from '@/services/contactService'

export default {
    data() {
        return {
            contact: null,
        }
    },
    async created() {
        const { id: contactId } = this.$route.params
        this.contact = await contactService.getContactById(contactId)
    },
}
</script>

<style lang="scss">
.contact-details {
    display: grid;
    gap: 1em;

    padding: 10px;
    background-color: whitesmoke;

    img {
        width: 120px;
    }

    a {
        justify-self: end;
    }
}
</style>
