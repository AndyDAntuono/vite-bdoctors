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
  <div class="col-12 col-md-6 d-flex flex-column align-items-start search-bar-box">
    <div class="badge-carousel-wrapper">
      <!-- Carosello per specializzazioni in verticale -->
      <div class="badge-carousel" ref="carousel">
        <span
          v-for="(field, i) in store.fields_list"
          :key="`field-${i}`"
          :class="['badge', store.selectedField === field.name ? 'bg-primary' : 'bg-secondary']"
          @click="selectField(field.name)"
        >
          {{ field.name }}
        </span>
      </div>
    </div>

    <!-- Radio Button per selezionare il criterio di ordinamento -->
    <div class="sort-criteria">
      <h5 class="w-25 text-center p-1 rounded">Ricerca avanzata</h5>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  flex-direction: column; // Imposta il carosello in verticale
  overflow-y: auto; // Abilita lo scroll verticale
  max-height: 300px; // Altezza massima per attivare lo scroll
  width: 100%;
  padding: 0.5rem 0;
  scroll-behavior: smooth;
}

.badge {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem; // Spazio tra i badge
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
}
/* Stili per il menu di ordinamento */

h5 {
  background-color: #005792;
  color: white;
}

.sort-criteria {
  margin-top: 1rem;
  width: 100%;
}
.radio-options {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}
.radio-options label {
  cursor: pointer;
}
.radio-options input[type="radio"] {
  margin-right: 0.25rem;
}

br {
  display: none;
}

/* Media Queries */

@media (max-width: 1024px) {
  br {
    display: none;
  }

  h5 {
    font-size: 1.12rem;
  }

  br {
    display: none;
  }

}

@media (max-width: 768px) {
  .radio-options {
    flex-direction: column;
  }

  h5 {
    font-size: 1.06rem;
  }

  br {
    display: none;
  }
}

@media (max-width: 425px) { /* Mobile L */
  .badge-carousel-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  .badge-carousel {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 300px;
    width: 100%;
  }
  .badge {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
  .carousel-arrow {
    display: none;
  }

  h5 {
    font-size: 1rem;
  }

  .ratings, .reviews {
    font-size: 1rem;
  }

  br {
    display: block;
  }

}

@media (max-width: 375px) { /* Mobile M */
  .badge-carousel-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  .badge-carousel {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 250px;
    width: 100%;
  }
  .badge {
    margin-bottom: 0.4rem;
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
  }
  .carousel-arrow {
    display: none;
  }

  h5 {
    font-size: 0.75rem;
  }

}

@media (max-width: 320px) { /* Mobile S */
  .badge-carousel-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  .badge-carousel {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 200px;
    width: 100%;
  }
  .badge {
    margin-bottom: 0.3rem;
    font-size: 0.65rem;
    padding: 0.25rem 0.4rem;
  }
  .carousel-arrow {
    display: none;
  }
}
</style>
