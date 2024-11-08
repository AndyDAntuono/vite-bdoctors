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
    <!-- Contenitore Carosello con Frecce -->
    <div class="badge-carousel-wrapper">
      <button @click="scrollLeft" class="carousel-arrow left-arrow">◀</button>
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
      <button @click="scrollRight" class="carousel-arrow right-arrow">▶</button>
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
}

@media (max-width: 1200px) {
  .badge-carousel-wrapper {
    max-width: 1000px;
  }
}

@media (max-width: 768px) {
  .badge-carousel-wrapper {
    max-width: 700px;
  }
}

@media (max-width: 425px) {
  .badge-carousel-wrapper {
    max-width: 400px;
  }
}

@media (max-width: 375px) {
  .badge-carousel-wrapper {
    max-width: 300px;
  }
}

</style>
