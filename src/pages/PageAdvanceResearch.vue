<script>
import { store } from '../store.js'; 
import axios from 'axios';
import DoctorSearch from '../components/DoctorSearch.vue';

export default {
    components: {
        DoctorSearch
    },
    data() {
        return {
            store,
            data: {
                name: '',
                surname: '',
                city: '',
                phone: '',
                averageVote: ''
            }
        };
    },
    created() {
        this.getFields();
        this.getDoctors(); 
    },
    methods: {
        getDoctors() {
            let url = `${store.url}${store.doctors}`;
            axios.get(url).then((res) => {
                store.all_doctors = res.data.results;
                store.filteredDoctors = store.all_doctors;
            });
        },

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
                <h1 class="text-center my-4 title">Ricerca avanzata</h1>
            </div>
            <div class="col-12">           
                <form class="py-4 px-3 rounded">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-4 mb-3">
                            <label for="name" class="form-label fw-bold">Nome</label>
                            <input v-model="name" type="text" class="form-control" id="" placeholder="Inserisci il nome">
                        </div>
                        <div class="col-12 col-md-6 col-lg-4 mb-3">
                            <label for="surname" class="form-label fw-bold">Cognome</label>
                            <input v-model="surname" type="text" class="form-control" id="" placeholder="Inserisci il cognome">
                        </div>

                        <div class="col-12 col-md-6 col-lg-4 mb-3">
                            <label for="city" class="form-label fw-bold">Città</label>
                            <input v-model="city" type="text" class="form-control" id="" placeholder="Inserisci la città">
                        </div>

                        <div class="col-12 col-md-6 col-lg-4 mb-3">
                            <label for="phone" class="form-label fw-bold">Numero di Telefono</label>
                            <input v-model="phone" type="text" class="form-control" id="" placeholder="Inserisci il numero di telefono">
                        </div>
                        <div class="col-12 col-md-6 col-lg-4 mb-3">
                            <label for="fields" class="form-label fw-bold">Specializzazione</label>
                            <select class="form-select" aria-label="select" v-model="store.selectedField">
                                <option value="">Seleziona specializzazione</option>
                                <option v-for="(field, i) in store.fields_list" :key="`field-${i}`" :value="field.name">
                                    {{ field.name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4 mb-3">
                            <label for="average-vote" class="form-label fw-bold">Media Voto</label>
                            <select v-model="name" class="form-select" id="">
                                <option value="averageVote">Seleziona media voto</option>
                                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                            </select>
                        </div>

                        <div class="col-12 mt-4">
                            <div class="d-flex justify-content-center"><button type="submit" class="send px-3">Cerca</button></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <DoctorSearch v-for="doctor in store.filteredDoctors" :key="doctor.id" :doctor="doctor" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';
title {
    color: $navy-blue;
}
form {
    background-color: $light-gray;
    color: $navy-blue;
    box-shadow: 2px 2px 5px $dark-grey;
}
</style>
