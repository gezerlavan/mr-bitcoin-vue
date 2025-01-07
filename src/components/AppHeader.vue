<template>
    <header class="app-header">
        <p>Hi {{ loggedInUser.name }}</p>
        <p>Bitcoin exchange rate: {{ rate }}</p>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/contact">Contacts</RouterLink>
            <RouterLink to="/chart">Chart</RouterLink>
        </nav>
    </header>
</template>

<script>
import { bitcoinService } from '@/services/bitcoinService'
import { userService } from '@/services/userService'

export default {
    data() {
        return {
            loggedInUser: userService.getUser(),
            rate: null,
        }
    },
    methods: {
        async getBitcoinRate() {
            this.rate = await bitcoinService.getRate()
        },
    },
    created() {
        this.getBitcoinRate()
    },
}
</script>

<style lang="scss">
header.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5vh;

    padding: 10px;
    background-color: rgb(255, 183, 92);

    nav {
        display: flex;
        gap: 1em;
    }
}
</style>
