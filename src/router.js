import { createRouter, createWebHistory } from "vue-router";
import { store } from "./store";
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
            component: PageHome,
            meta: { title: 'BDoctors - Trova il dottore adatto a te!'}
        },
        {
            path: '/doctors/:slug',
            name: 'doctor',
            component: PageSingleDoctor,
            meta: { title: 'BD - Dettagli'}
        },
        {
            path: '/contact-us',
            name: 'contact',
            component: PageContactUs,
            meta: { title: 'BD - Contattaci'}
        },
        {
            path: '/about-us',
            name: 'about',
            component: PageAboutUs,
            meta: { title: 'BD - Chi siamo'}
        },
        {
            path: '/advanced-research',
            name: 'advanced-research',
            component: PageAdvanceResearch,
            meta: { title: 'BD - Ricerca avanzata'}
        }
    ]
});

// logica per aggiornare il titolo in base al meta di ogni rotta
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    store.isLoading = true;
    // continua navigazione
    setTimeout(() => next(), 500);
  });

  router.afterEach(() => {
    store.isLoading = false; // Disattiva il loader
});

export default router;
