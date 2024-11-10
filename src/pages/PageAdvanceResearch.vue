<script>
import { store } from '../store.js'; 
import axios from 'axios';

export default {
  data() {
    return {
      store,
    };
  },
  created() {
    this.getFields();
  },
  methods: {
    // Recupero tutte le specializzazioni e le salvo in fields_list
    getFields() {
      let fieldsurl = `${store.url}/fields`; 
      axios.get(fieldsurl).then((res) => {
        console.log(res.data.results);
        store.fields_list = res.data.results;
      });
    },
  }
};
</script>

<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-12">           
                <form>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="name" placeholder="Inserisci il nome">
                        </div>
                        
                        <div class="col-md-6 mb-3">
                            <label for="surname" class="form-label">Cognome</label>
                            <input type="text" class="form-control" id="surname" placeholder="Inserisci il cognome">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="city" class="form-label">Città</label>
                            <input type="text" class="form-control" id="city" placeholder="Inserisci la città">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="phone" class="form-label">Numero di Telefono</label>
                            <input type="text" class="form-control" id="phone" placeholder="Inserisci il numero di telefono">
                        </div>
                        
                        <div class="col-md-6 mb-3">
                            <label for="specialization" class="form-label">Specializzazione</label>
                            <select class="form-select" aria-label="select" v-model="store.selectedField">
                                <option value="">Seleziona specializzazione</option>
                                <option v-for="(field, i) in store.fields_list" :key="`field-${i}`" :value="field.name">
                                    {{ field.name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-12 text-center mt-4">
                            <button type="submit" class="btn btn-primary">Cerca</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';
</style>
