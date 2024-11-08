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
  <header class="header text-white">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center py-3">
         
          <router-link to="/" class="d-flex align-items-center text-white text-decoration-none">
            <img src="../../public/logo.png" alt="Logo" class="logo me-2" />
            <span class="fw-bolder">Bdoctors</span>
          </router-link>

          <!-- Menu di navigazione -->
          <ul class="nav-list d-flex mb-0">
            <li v-for="(item, index) in menu" :key="index" class="ms-3">
              <router-link class="text-white text-decoration-none" :to="{ name: item.name }">{{ item.label }}</router-link>
            </li>

            <li class="nav-item dropdown ms-3">
              <a class="nav-link dropdown-toggle text-white fw-bold" href="#" id="doctorDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sei un dottore?
              </a>
              <!-- Si aprono in un'altra scheda (uso di _blank) -->
              <ul class="dropdown-menu" aria-labelledby="doctorDropdown">
                <li>
                  <a class="dropdown-item" href="http://127.0.0.1:8000/register" target="_blank">
                    Registrati
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="http://127.0.0.1:8000/" target="_blank">
                    Area professionisti
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

.header {
  background-color: $navy-blue; 
}

.nav-list {
  list-style: none;
  padding: 0;
}

.nav-list li {
  font-size: 1rem;
}

.logo {
  width: 40px; 
  height: auto;
}
</style>
