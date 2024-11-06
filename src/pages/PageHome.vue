<script>
import { store } from '../store';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard.vue';
export default {
  name: 'PageHome',
  components: {
    DoctorCard
  },
  data() {
    return {
      store,
      doctors: {}
    }
  },
  created(){
    let url = `${store.url}${store.doctors}`
    axios.get(url).then((res) => {
      this.doctors = res.data.results
    })
  },
};
</script>

<template>
  <div class="home-container">
    <div class="container">
      <div class="row">
        <!-- Parte superiore sinistra: descrizione -->
        <div class="col-12 col-md-6 d-flex flex-column align-items-start description-box p-4 border">
          <h1 class="fw-bolder text-white">Benvenuti su Bdoctors</h1>
          <p class="fw-bolder">
            Trova i migliori medici nella tua zona e specializzati in diverse discipline.
            Usa la barra di ricerca per filtrare per specializzazione e città.
          </p>
        </div>

        <!-- Parte inferiore sinistra: barra di ricerca -->
        <div class="col-12 col-md-6 d-flex flex-column align-items-start search-bar-box border">
          <form>
            <div class="mb-3">
              <label for="" class="form-label fw-bolder">Specializzazione</label>
              <input type="text" id="" placeholder="Es. Cardiologia" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="" class="form-label fw-bolder">Città</label>
              <input type="text" id="" placeholder="Es. Milano" class="form-control" />
            </div>
            <button type="button" class="btn btn-primary">Cerca</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-5">
    <div class="row gy-3">
      <DoctorCard v-for="doctor in doctors" :key="doctor.id" :doctor="doctor"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

/* Sfondo immagine per la pagina */
.home-container {
  background-image: url('../../public/bg-home.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}


.description-box p {
  font-size: 1rem;
}


.search-bar-box {
  padding: 1rem;
  width: 100%;
}


</style>
