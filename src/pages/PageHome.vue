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
    this.getDoctors();
    // chiamo funzione get fields per recuperare le specializzazioni
    this.getFields();
  },
  methods: {
    getDoctors() {
      let url = `${store.url}${store.doctors}`;
      axios.get(url).then((res) => {
        // store.all_doctors = res.data.results.data;
        // this.last_page = res.data.results.last_page;
        // this.current_page = res.data.results.current_page;
        // console.log(res.data.results)
        const doctorsObject = res.data.results;
        // trasformo ogg in array così da poter usare sort()
        const doctorsArray = Object.values(doctorsObject);

        store.all_doctors = doctorsArray.sort((a, b) => {
          const sponsorA = a.sponsors?.[0]?.pivot?.expiring_date;
          const sponsorB = b.sponsors?.[0]?.pivot?.expiring_date;

          if (!sponsorA && !sponsorB) return 0; // Nessuna sponsorizzazione
          if (!sponsorA) return 1;              // A senza sponsorizzazione
          if (!sponsorB) return -1;             // B senza sponsorizzazione

          // Confronta le date in ord decr
          return new Date(b.sponsors[0].pivot.expiring_date) - new Date(a.sponsors[0].pivot.expiring_date);
        })
        store.filteredDoctors = store.all_doctors;
        // store.filteredDoctors = store.all_doctors; // inizialmente medici filtrati = tutti i medici
      })
    },
    //paginazione
    goToPage(page) {
      this.current_page = page;
      let url_page = `${store.url}${store.doctors}`;
      axios.get(url_page, { params: { page: page } }).then((res) => {
        store.all_doctors = res.data.results.data;
        // update dottori filtrati
        store.filteredDoctors = store.all_doctors;
        // update ultima pagina
        this.last_page = res.data.results.last_page;
      })
    },
    // funzione di recupero di tutte le specializzazioni e recovery in fields_list
    getFields() {
      let fieldsurl = `${store.url}${store.fields}`;
      axios.get(fieldsurl).then((res) => {
        console.log(res.data.results);
        store.fields_list = res.data.results;
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
        <div class="col-6 col-md-6 col-lg-6 d-flex flex-column">
          <h1 class="fw-bolder text-white">Benvenuti su Bdoctors</h1>
          <p class="fw-bolder m-0">
            Trova i migliori medici in Italia! <br>
            Scorri tra le specializzazioni e fai click su una di esse per trovare il medico adatto alle tue esigenze.
          </p>
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

.home-container {
  background-image: url('../../public/bg-home.jpg');
  background-size: cover;
  background-position: top;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;

  h1 {
    font-size: 2.5rem;
  }
}

.bg-cards {
  background-image: url('../../public/bg-cards.jpg');
  background-repeat: repeat;
  background-position: -200px 0;
}

@media (max-width: 992px) {
  .home-container {
    height: 80vh;
    padding: 1.5rem;
  }

  .home-container h1 {
    font-size: 1.5rem;
  }

  .home-container p {
    font-size: 1rem;
  }
}

@media (max-width: 992px) and (min-width: 768px) {
  .home-container h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .home-container p {
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .home-container {
    height: auto;
    padding: 1.5rem 1rem;
    flex-direction: column;
  }

  .home-container h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .home-container p {
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .home-container {
    height: auto;
    padding: 1.5rem 1rem;
  }

  .home-container h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .home-container p {
    font-size: 0.9rem;
  }
}

@media (max-width: 375px) {
  .home-container {
    height: auto;
    padding: 1rem 0.5rem;
  }

  .home-container h1 {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }

  .home-container p {
    font-size: 0.7rem;
  }
}
</style>
