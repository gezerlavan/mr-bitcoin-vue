import { createRouter, createWebHashHistory } from 'vue-router'

import ContactDetails from '@/views/ContactDetails.vue'
import ContactIndex from '@/views/ContactIndex.vue'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/contact',
            name: 'ContactIndex',
            component: ContactIndex,
        },
        {
            path: '/contact/:id',
            name: 'ContactDetails',
            component: ContactDetails,
        },
    ],
})

export default router
