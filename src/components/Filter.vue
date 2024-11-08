<script>
import { store } from '../store';
export default {
  name: "Filter",
  data() {
    return {
      store
    };
  },
  methods: {
    selectField(field) {
      if (store.selectedField === field) {
        store.selectedField = ""; // Deseleziona se cliccato di nuovo
      } else {
        store.selectedField = field;
      }
      this.filterFields();
    },
    filterFields() {
      if (store.selectedField) {
        store.filteredDoctors = store.all_doctors.filter((doctor) => {
          return doctor.fields.some((field) => field.name === store.selectedField);
        });
      } else {
        store.filteredDoctors = [...store.all_doctors];
      }
    },
    scrollLeft() {
      this.$refs.carousel.scrollBy({ left: -150, behavior: 'smooth' });
    },
    scrollRight() {
      this.$refs.carousel.scrollBy({ left: 150, behavior: 'smooth' });
    }
  }
};
</script>

<template>
  <div class="col-12 d-flex flex-column align-items-start search-bar-box">
    <div class="badge-carousel-wrapper">
      <button v-if="!isMobile" @click="scrollLeft" class="carousel-arrow left-arrow">◀</button>
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
  overflow: hidden; /* Limita il carosello alla larghezza del contenitore */
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

/* Media Queries per i diversi dispositivi */
@media (max-width: 1024px) { /* Laptop */
  .badge {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 768px) { /* Tablet */
  .badge {
    font-size: 0.8rem;
    padding: 0.4rem 0.7rem;
  }
  .carousel-arrow {
    font-size: 1.3rem;
  }
}

@media (max-width: 425px) { /* Mobile L */
  .badge-carousel-wrapper {
    flex-direction: column; /* Disposizione verticale */
    align-items: flex-start; /* Allineamento a sinistra */
  }
  .badge-carousel {
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* Scroll verticale */
    max-height: 300px; /* Limita l'altezza per evitare overflow */
    width: 100%;
  }
  .badge {
    margin-bottom: 0.5rem;
    margin-right: 0;
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
  .carousel-arrow {
    display: none; /* Nascondi le frecce per la visualizzazione verticale */
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
    margin-right: 0;
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
    margin-right: 0;
    font-size: 0.65rem;
    padding: 0.25rem 0.4rem;
  }
  .carousel-arrow {
    display: none;
  }
}
</style>
