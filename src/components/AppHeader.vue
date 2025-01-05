<template>
    <header class="app-header">
        <nav>
            <RouterLink to="/">Home</RouterLink>
        </nav>
    </header>
</template>

<script>
export default {}
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
