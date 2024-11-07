<script>
import { store } from '../store';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard.vue';
import Filter from '../components/Filter.vue';
export default {
  name: 'PageHome',
  components: {
    DoctorCard,
    Filter
  },
  data() {
    return {
      store
    }
  },
  created() {
    // recupero medici tramite api
    let url = `${store.url}${store.doctors}`
    axios.get(url).then((res) => {
      store.all_doctors = res.data.results;
      store.filteredDoctors = store.all_doctors // inizialmente medici filtrati = tutti i medici
    }),
    // chiamo funzione get fields per recuperare le specializzazioni
      this.getFields()
  },
  methods: {
    // funzione di recupero di tutte le specializzazioni e recovery in fields_list
    getFields() {
      let fieldsurl = `${store.url}${store.doctors}${store.search}`
      axios.get(fieldsurl).then((res) => {
        console.log(res.data.results)
        store.fields_list = res.data.results
      })
    }
  }
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
        <!-- Parte inferiore sinistra: barra di ricerca inserita in una componente -->
        <Filter />
      </div>
    </div>
  </div>
  <div class="container my-5">
    <div class="row gy-3">
      <DoctorCard v-for="doctor in store.filteredDoctors" :key="doctor.id" :doctor="doctor" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

/* Sfondo immagine per la pagina */
.home-container {
  background-image: url('../../public/bg-home.jpg');
  background-size: cover;
  background-position: top;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}


.description-box p {
  font-size: 1rem;
}
</style>
