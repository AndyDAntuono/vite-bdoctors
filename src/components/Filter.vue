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
    filterFields() {
      if (store.selectedField) {
        // Filtra i medici che hanno almeno un campo con il nome corrispondente alla specializzazione selezionata e salvo in filteredDoctors
        store.filteredDoctors = store.all_doctors.filter((doctor) => {
          return doctor.fields.some((field) => field.name === store.selectedField);
        });
      } else {
        // Se nessuna specializzazione è selezionata, ripristina tutti i medici
        store.filteredDoctors = [...store.all_doctors]
      }
    }
  }
};
</script>
<template>
    <div class="col-12 d-flex flex-column align-items-start search-bar-box border">
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
</template>
<style lang="scss" scoped>
.search-bar-box {
    padding: 1rem;
    width: 100%;
  }
</style>