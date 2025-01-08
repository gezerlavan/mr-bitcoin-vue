<template>
    <section class="contact-filter">
        <input
            v-model="filterBy.term"
            @input="debouncedFilterBy"
            type="text"
            placeholder="Serach"
        />
    </section>
</template>

<script>
import { debounce } from '@/services/util.service'

export default {
    data() {
        return {
            filterBy: { term: '' },
        }
    },
    methods: {
        setFilterBy() {
            this.$emit('filter', this.filterBy)
        },
    },
    computed: {
        debouncedFilterBy() {
            return debounce(this.setFilterBy, 500)
        },
    },
}
</script>

<style lang="scss">
.contact-filter {
    margin-block-end: 1em;
}
</style>
