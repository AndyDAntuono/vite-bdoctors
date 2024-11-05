<script>
import Header from './components/AppHeader.vue';
import Footer from './components/AppFooter.vue';


export default {
    components: {
    Header,
    Footer
  }
}
</script>

<template>
    <main class="h-100">
    <!-- componente Header -->
        <Header />

        <router-view></router-view>
    <!-- componente Footer -->
        <Footer />
    </main>
</template>

<style lang="scss">
@import './styles/generals.scss';
</style>
