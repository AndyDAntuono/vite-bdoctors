import { createRouter, createWebHistory } from "vue-router";

import PageHome from "./pages/PageHome.vue";
import PageContactUs from "./pages/PageContactUs.vue";
import PageAboutUs from "./pages/PageAboutUs.vue";
import PageSingleDoctor from "./pages/PageSingleDoctor.vue";
import PageAdvanceResearch from "./pages/PageAdvanceResearch.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: PageHome
        },
        {
            path: '/doctors/:slug',
            name: 'doctor',
            component: PageSingleDoctor
        },
        {
            path: '/contact-us',
            name: 'contact',
            component: PageContactUs
        },
        {
            path: '/about-us',
            name: 'about',
            component: PageAboutUs
        },
        {
            path: '/advanced-research',
            name: 'advanced-research',
            component: PageAdvanceResearch
        }
    ]
});

export default router;
