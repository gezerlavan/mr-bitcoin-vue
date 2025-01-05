<template>
    <section class="home">
        <pre>{{ loggedInUser }}</pre>
    </section>
</template>

<script>
import { userService } from '../services/userService'

export default {
    data() {
        return {
            loggedInUser: userService.getUser(),
        }
    },
}
</script>

<style lang="scss"></style>
