import { createRouter, createWebHistory } from "vue-router";

import PageHome from "./pages/PageHome.vue";
import PageContactUs from "./pages/PageContactUs.vue";
import PageAboutUs from "./pages/PageAboutUs.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: PageHome
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: PageContactUs
        },
        {
            path: '/about-us',
            name: 'about-us',
            component: PageAboutUs
        }
    ]
});

export default router;
