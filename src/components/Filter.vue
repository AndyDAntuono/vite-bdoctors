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
    // Metodo per selezionare la specializzazione e applicare il filtro
    selectField(field) {
      if (store.selectedField === field) {
        store.selectedField = ""; // Deseleziona se cliccato di nuovo
      } else {
        store.selectedField = field;
      }
      this.filterFields(); // Applica il filtro
    },
    filterFields() {
      if (store.selectedField) {
        // Filtra i medici con la specializzazione selezionata
        store.filteredDoctors = store.all_doctors.filter((doctor) => {
          return doctor.fields.some((field) => field.name === store.selectedField);
        });
      } else {
        // Mostra tutti i medici se nessuna specializzazione è selezionata
        store.filteredDoctors = [...store.all_doctors];
      }
    }
  }
};
</script>

<template>
  <div class="col-12 d-flex flex-column align-items-start search-bar-box">
    <div class="mb-3">
      <!-- Genera i badge per ogni specializzazione -->
      <span
        v-for="(field, i) in store.fields_list"
        :key="`field-${i}`"
        :class="['badge', 'm-1', store.selectedField === field.name ? 'bg-primary' : 'bg-secondary']"
        @click="selectField(field.name)"
        style="cursor: pointer;"
      >
        {{ field.name }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-bar-box {
  padding: 1rem;
  width: 100%;
}
.badge {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
</style>
