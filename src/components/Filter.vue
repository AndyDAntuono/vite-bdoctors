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

      // Ordina i dottori per criterio di "media dei voti" o "numero di recensioni"
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
  <div class="col-12 d-flex flex-column align-items-start search-bar-box">
    <div class="badge-carousel-wrapper">
      <!-- Frecce per scroll -->
      <button v-if="!isMobile" @click="scrollLeft" class="carousel-arrow left-arrow">◀</button>
      <!-- Carosello per specializzazioni -->
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
      <button v-if="!isMobile" @click="scrollRight" class="carousel-arrow right-arrow">▶</button>
    </div>

    <!-- Menu per selezionare criterio di ordinamento -->
    <div class="sort-criteria">
      <label for="sort-select">Ordina per:</label>
      <select id="sort-select" v-model="sortCriteria" @change="changeSortCriteria(sortCriteria)">
        <option value="media_voti">Media dei Voti</option>
        <option value="numero_recensioni">Numero di Recensioni</option>
      </select>
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
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.carousel-arrow {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}
.left-arrow {
  margin-right: 0.5rem;
}
.right-arrow {
  margin-left: 0.5rem;
}
.badge-carousel {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0.5rem 0;
  scroll-behavior: smooth;
  width: 100%;
}
.badge-carousel::-webkit-scrollbar {
  display: none;
}
.badge {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
}

/* Stili per il menu di ordinamento */
.sort-criteria {
  margin-top: 1rem;
  width: 100%;
}
.sort-criteria label {
  font-weight: bold;
}
.sort-criteria select {
  margin-left: 0.5rem;
  padding: 0.5rem;
}

/* Media Queries */
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
