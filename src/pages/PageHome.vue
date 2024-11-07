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
      doctors: []
    }
  },
  created() {
    // recupero medici
    let url = `${store.url}${store.doctors}`
    axios.get(url).then((res) => {
      this.doctors = res.data.results;
      store.filteredDoctors = this.doctors // inizialmente medici filtrati = tutti i medici
    }),
    // chiamo funzione get fields
      this.getFields()
  },
  methods: {
    // recupero tutte le specializzazioni e le salvo in fields_list
    getFields() {
      let fieldsurl = `${store.url}${store.doctors}${store.search}`
      axios.get(fieldsurl).then((res) => {
        console.log(res.data.results)
        store.fields_list = res.data.results
      })
    },
    filterFields() {
      if (store.selectedField) {
        // Filtra i medici che hanno almeno un campo con il nome corrispondente alla specializzazione selezionata e salvo in filteredDoctors
        store.filteredDoctors = this.doctors.filter((doctor) => {
          return doctor.fields.some((field) => field.name === store.selectedField);
        });
      } else {
        // Se nessuna specializzazione è selezionata, ripristina tutti i medici
        store.filteredDoctors = this.doctors;
      }
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

        <!-- Parte inferiore sinistra: barra di ricerca -->
        <div class="col-12 col-md-6 d-flex flex-column align-items-start search-bar-box border">
          <!-- submit senza refresh -->
          <form @submit.prevent="filterFields">
            <div class="mb-3">
              <select class="form-select" aria-label="select" name="" id="" v-model="store.selectedField">
                <option value="">--Seleziona specializzazione--</option>
                <option v-for="field, i in store.fields_list" :key="`field-${i}`" :value="field.name">{{ field.name }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Cerca</button>
          </form>
        </div>
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


.search-bar-box {
  padding: 1rem;
  width: 100%;
}
</style>
