<script>
export default {
  name: 'Header',
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  computed: {
    classIcon() {
      return this.isHovered ? 'bi bi-list' : 'bi bi-list-nested';
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

          <!-- Hamburger (mobile) -->
          <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu"  @mouseover="isHovered = true" @mouseleave="isHovered = false">
            <i :class="classIcon"></i>
          </button>

          <!-- Menu di navigazione (desktop) -->
          <ul class="nav-list d-none d-lg-flex align-items-center mb-0">
            <li v-for="(item, index) in menu" :key="index">
              <router-link class="text-decoration-none links" :to="{ name: item.name }">{{ item.label }}</router-link>
            </li>

            <!-- Dropdown per accesso area riservata (desktop) -->
            <li class="nav-item dropdown ms-3">
              <a class="nav-link dropdown-toggle fw-bold custom-dropdown rounded" href="#" id="doctorDropdown"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sei un medico?
              </a>
              <!-- Si aprono in un'altra scheda (uso di _blank) -->
              <ul class="dropdown-menu" aria-labelledby="doctorDropdown">
                <li>
                  <a class="dropdown-item" href="http://127.0.0.1:8000/register" target="_blank">
                    <i class="bi bi-pen-fill"></i> Registrati
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="http://127.0.0.1:8000/" target="_blank">
                    <i class="bi bi-clipboard2-pulse-fill"></i> Area professionisti
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <!-- Offcanvas (mobile) -->
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
            <div class="offcanvas-header py-4">
              <h5 class="offcanvas-title fw-bolder" id="offcanvasMenuLabel">BDoctors</h5>
              <span class="doc-line d-flex ms-2">
                <img src="../../public/pngegg.png" alt="">
              </span>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="nav-list d-flex flex-column align-items-start mb-0">
                <li v-for="(item, index) in menu" :key="index">
                  <router-link class="text-decoration-none links-canvas" :to="{ name: item.name }">{{ item.label
                    }}</router-link>
                </li>

                <!-- Dropdown (mobile) -->
                <li class="nav-item dropdown w-100 mt-2">
                  <a class="nav-link dropdown-toggle fw-bold custom-dropdown-canvas rounded" href="#" id="doctorDropdownMobile"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sei un medico?
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="doctorDropdownMobile">
                    <li>
                      <a class="dropdown-item" href="http://127.0.0.1:8000/register" target="_blank"><i class="bi bi-pen-fill"></i> Registrati</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="http://127.0.0.1:8000/" target="_blank"><i class="bi bi-clipboard2-pulse-fill"></i> Area professionisti</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

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

.links-canvas {
  color: $navy-blue;
  padding: 10px 0px;
  margin-bottom: 15px;

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

.custom-dropdown-canvas {
  color: $navy-blue;
  padding: 10px 0px;
  transition: all 0.5s;

  &:hover {
    color: #000;
  }
}

.bi-list-nested, .bi-list {
  color: $pure-white;
  font-size: 30px;
  transition: all 2s ease;
}

.offcanvas {
  .dropdown-menu{
    border: none;
  }
}

.offcanvas-body {
  padding: 10px;
}

.offcanvas-header {
  padding: 10px 20px;
  padding-left: 20px;
  background-color: $navy-blue;
  .offcanvas-title {
    letter-spacing: 1px;
    color: $pure-white;
  }
  .doc-line {
    width: 40px;
    height: 20px;
    vertical-align: middle;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(137deg) brightness(107%) contrast(102%);
    }
  }
}

.offcanvas-body {
  padding: 10px 20px;
  padding-top: 30px;
}

.dropdown-menu {
  color: $navy-blue;
}
</style>
