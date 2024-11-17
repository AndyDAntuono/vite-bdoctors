<script>
import Header from './components/AppHeader.vue';
import Footer from './components/AppFooter.vue';
import Loader from './components/Loader.vue';
import { store } from './store.js'; 


export default {
  components:{
    Header,
    Footer,
    Loader

  },
  data() {
    return {
      store
    }
  }
}
</script>

<template>
    <main class="h-100">
    <!-- componente Header -->
        <Header  :menu="store.menu" />
        <Loader />
        <router-view></router-view>
    <!-- componente Footer -->
        <Footer />
    </main>
</template>

<style lang="scss">
@import './styles/generals.scss';


</style>
