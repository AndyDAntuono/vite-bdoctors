<script>
export default {
  name: 'Header',
  props: {
    menu: {
      type: Array,
      required: true 
    }
  }
};
</script>

<template>
  <header class="header bg-dark text-white">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center py-3">
          <h1 class="text-white">Questo è il nostro header</h1>
          
          <!-- Menu di navigazione -->
          <ul class="nav-list">
            <li v-for="(item, index) in menu" :key="index">
              <router-link :to="{ name: item.name }">{{ item.label }}</router-link>
            </li>
          </ul>
          
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>

</style>
