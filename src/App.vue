<script>
import Header from './components/Header.vue';


export default {
    components: {
    Header
  }
}
</script>

<template>
    <main class="h-100">
    <!-- componente Header -->
        <Header />

        <router-view></router-view>
    </main>
</template>

<style lang="scss">
@import './styles/generals.scss';
</style>
