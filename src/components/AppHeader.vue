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
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center padding-13">
         
          <router-link to="/" class="d-flex align-items-center text-white text-decoration-none">
            <img src="../../public/logo.png" alt="Logo" class="logo me-3" />
            <span class="fs-3 links">BDoctors</span>
          </router-link>

          <!-- Menu di navigazione -->
          <ul class="nav-list d-flex align-items-center mb-0">
            <li v-for="(item, index) in menu" :key="index">
              <router-link class="text-decoration-none links" :to="{ name: item.name }">{{ item.label }}</router-link>
            </li>

            <li class="nav-item dropdown ms-3">
              <a class="nav-link dropdown-toggle fw-bold custom-dropdown rounded" href="#" id="doctorDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sei un medico?
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
  .padding-13 {
    padding: 13px;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
}

.nav-list li {
  font-size: 1rem;
}

.links {
  color: $pure-white;
  padding: 0.5rem;
  &:hover {
    color: $aqua-green;
  }
}

.logo {
  width: 70px; 
  height: auto;
}

.custom-dropdown {
  background-color: $mint-green;
  color: $navy-blue;
  padding: 8px 12px;
  transition: all 0.5s;
  &:hover {
    background-color: $aqua-green;
    color: $navy-blue;
  }
}
</style>
