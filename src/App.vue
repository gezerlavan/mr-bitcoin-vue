<template>
    <UserMsg />
    <AppHeader />
    <main>
        <RouterView />
    </main>
    <AppFooter />
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import UserMsg from './components/UserMsg.vue'

export default {
    components: {
        AppHeader,
        AppFooter,
        UserMsg,
    },
}
</script>

<style lang="scss">
main {
    min-height: calc(90vh - 1rem);
    padding: 0.5em;
}
</style>
