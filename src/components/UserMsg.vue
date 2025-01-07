<template>
    <div v-if="msg" class="user-msg" :class="msg.type">
        <p>{{ msg.txt }}</p>
    </div>
</template>

<script>
import { eventBus } from '@/services/eventBus.service'

export default {
    data() {
        return {
            msg: null,
        }
    },
    methods: {
        onUserMsg(msg) {
            this.msg = msg
            setTimeout(() => (this.msg = null), 2000)
        },
    },
    created() {
        eventBus.on('user-msg', this.onUserMsg)
    },
}
</script>

<style lang="scss">
.user-msg {
    position: absolute;
    top: 70px;
    right: 1rem;
    min-width: 150px;

    padding: 10px;
    border-radius: 0.5rem;
    background-color: darkslategray;

    color: #eee;

    &.success {
        background-color: darkseagreen;
    }

    &.error {
        background-color: orangered;
    }
}
</style>
