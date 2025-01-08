<template>
    <section class="contact-list">
        <ul>
            <li v-for="contact in contacts" :key="contact._id">
                <ContactPreview :contact="contact" />
                <div class="actions">
                    <button @click="onRemoveContact(contact._id)">x</button>
                    <RouterLink :to="`/contact/${contact._id}`">
                        <button>Details</button>
                    </RouterLink>
                    <RouterLink :to="`/contact/edit/${contact._id}`">
                        <button>Edit</button>
                    </RouterLink>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import ContactPreview from './ContactPreview.vue'

export default {
    props: {
        contacts: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('remove', contactId)
        },
    },
    components: {
        ContactPreview,
    },
}
</script>

<style lang="scss">
.contact-list ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 10px;

    padding: 0;
    list-style: none;

    li {
        display: grid;
        padding: 10px;
        background-color: rgb(255, 236, 116);

        .actions {
            display: flex;
            gap: 0.3rem;
            justify-self: end;
        }
    }
}
</style>
