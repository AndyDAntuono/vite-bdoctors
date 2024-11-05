<script>
export default {
  name: 'Header',
 
};
</script>

<template>
  <header class="header bg-dark text-white">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center py-3">
          
          <router-link class="navbar-brand text-white" to="/">Homepage</router-link>

        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: #343a40; 
}

</style>
