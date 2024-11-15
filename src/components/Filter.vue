<script>
import { store } from '../store';
export default {
  name: "Filter",
  data() {
    return {
      store,
      sortCriteria: "media_voti" // Default: Ordina per media dei voti
    };
  },
  methods: {
    selectField(field) {
      if (store.selectedField === field) {
        store.selectedField = ""; // Deseleziona se cliccato di nuovo
      } else {
        store.selectedField = field;
      }
      this.filterAndSortDoctors();
    },
    filterAndSortDoctors() {
      // Filtra i dottori per specializzazione
      if (store.selectedField) {
        store.filteredDoctors = store.all_doctors.filter((doctor) => {
          return doctor.fields.some((field) => field.name === store.selectedField);
        });
      } else {
        store.filteredDoctors = [...store.all_doctors];
      }

      // Ordina i dottori in base al criterio scelto ("media dei voti" o "numero di recensioni")
      store.filteredDoctors.sort((a, b) => {
        if (this.sortCriteria === "media_voti") {
          return b.media_voti - a.media_voti; // Ordine decrescente per media voti
        } else if (this.sortCriteria === "numero_recensioni") {
          return b.numero_recensioni - a.numero_recensioni; // Ordine decrescente per numero recensioni
        }
        return 0;
      });
    },
    changeSortCriteria(criteria) {
      this.sortCriteria = criteria;
      this.filterAndSortDoctors();
    }
  }
};
</script>

<template>
  <div class="col-6 col-md-6 d-flex flex-column align-items-start search-bar-box">
    <div class="badge-carousel-wrapper">
      <!-- Carosello per specializzazioni in verticale -->
      <div class="badge-carousel" ref="carousel">
        <span
        v-for="(field, i) in store.fields_list"
        :key="`field-${i}`"
        :class="['badge', store.selectedField === field.name ? 'bg-badge' : 'bg-secondary']"
        @click="selectField(field.name)"
      >
        {{ field.name }}
      </span>
      </div>
    </div>
    <p class="fw-bolder mt-4">Oppure esegui una ricerca più dettagliata:</p>
    <router-link class="text-decoration-none send" to="/advanced-research">Ricerca Avanzata</router-link>
  </div>
  <!-- Radio Button per selezionare il criterio di ordinamento -->
  <!--<div class="sort-criteria">
    <label><strong>Ordina per:</strong></label>
    <div class="radio-options">
      <label>
        <input class="ratings" type="radio" value="media_voti" v-model="sortCriteria" @change="changeSortCriteria('media_voti')" />
        Media dei Voti
      </label>
      <label>
        <input class="reviews" type="radio" value="numero_recensioni" v-model="sortCriteria" @change="changeSortCriteria('numero_recensioni')" />
        Numero di <br>Recensioni
      </label>
    </div>
  </div>-->
  
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

.search-bar-box {
  padding: 1rem;
  width: 100%;
}

.badge-carousel-wrapper {
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.badge-carousel {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 300px;
  width: 100%;
  padding: 0.5rem 0;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
}

.badge {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
}

.bg-badge {
  background-color: $navy-blue;
}

@media (max-width: 992px) {
  .badge {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .badge-carousel {
    max-height: 250px;
  }

  .search-bar-box {
    padding: 0.8rem;
  }
}

@media (max-width: 992px) and (min-width: 768px) {
  .badge {
    font-size: 0.85rem;
    padding: 0.3rem 0.7rem;
  }
  .badge-carousel {
    max-height: 200px;
  }
}

@media (max-width: 768px) {
  .badge {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
    margin-bottom: 0.4rem;
  }
  .badge-carousel {
    max-height: 180px;
  }
}

@media (max-width: 576px) {
  .badge {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
  .badge-carousel {
    max-height: 150px;
  }
}

@media (max-width: 375px) {
  .badge {
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
  }
  .badge-carousel {
    max-height: 130px;
  }
}

</style>