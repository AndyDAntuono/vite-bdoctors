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
      store,
      // last_page: null,
      // current_page: null,
      // first_page: 1,
    }
  },
  created() {
    // recupero medici tramite api
    this.getDoctors(),
    // chiamo funzione get fields per recuperare le specializzazioni
    this.getFields()
  },
  methods: {
    getDoctors() {
      let url = `${store.url}${store.doctors}`
      axios.get(url).then((res) => {
        // store.all_doctors = res.data.results.data;
        store.all_doctors = res.data.results;
        // this.last_page = res.data.results.last_page;
        // this.current_page = res.data.results.current_page;
        // console.log(res.data.results)
        store.filteredDoctors = store.all_doctors // inizialmente medici filtrati = tutti i medici
      })
    },
    //paginazione
    goToPage(page){
      this.current_page = page;
      let url_page = `${store.url}${store.doctors}`
      axios.get(url_page, { params: { page: page } }).then((res) => {
        store.all_doctors = res.data.results.data;
        // update dottori filtrati
        store.filteredDoctors = store.all_doctors
        // update ultima pagina
        this.last_page = res.data.results.last_page
      })
    },
    // funzione di recupero di tutte le specializzazioni e recovery in fields_list
    getFields() {
      let fieldsurl = `${store.url}${store.fields}`
      axios.get(fieldsurl).then((res) => {
        console.log(res.data.results)
        store.fields_list = res.data.results
      })
    },
  }
};
</script>

<template>
  <div class="home-container">
    <div class="container">
      <div class="row">
        <!-- Parte superiore sinistra: descrizione -->
        <div class="col-12 col-md-6 d-flex flex-column align-items-start description-box p-4">
          <h1 class="fw-bolder text-white">Benvenuti su Bdoctors</h1>
          <p class="fw-bolder">
            Trova i migliori medici in Italia! <br>
            Cerca il tuo medico in base alla sua specializzazione:
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <h5>Seleziona una specializzazione</h5>
        </div>
      </div>
      <div class="row">
        <!-- Parte inferiore sinistra: barra di ricerca inserita in una componente -->
        <Filter />
      </div>
    </div>
  </div>
  <div class="bg-cards">
    <div class="container">
      <div class="row gy-3">
        <DoctorCard v-for="doctor in store.filteredDoctors" :key="doctor.id" :doctor="doctor" />
      </div>
    </div>
  </div>
  <!-- <div class="container">
    <div class="row">
      <div class="col-12">
        <nav aria-label="Page navigation example" class="my-4">
          <ul class="pagination d-flex justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#" :class="current_page == 1 ? 'disabled' : ''" @click="goToPage(current_page - 1)">Precedente</a>
            </li>
            <li class="page-item" v-for="num_of_page in last_page" :key="num_of_page">
              <a class="page-link" href="#" @click="goToPage(num_of_page)">{{num_of_page}}</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" :class="current_page == last_page ? 'disabled' : ''"  @click="goToPage(current_page + 1)">Successivo</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

/* Sfondo immagine per la pagina */
.home-container {
  background-image: url('../../public/bg-home.jpg');
  background-size: cover;
  background-position: top;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}


.description-box p {
  font-size: 1rem;
}

.bg-cards{
  background-image: url('../../public/bg-cards.jpg');
  background-repeat: repeat;
  background-position: -200px 0; 

}
</style>
