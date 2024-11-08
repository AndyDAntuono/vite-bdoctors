<script>
import { store } from '../store.js'; 
import axios from 'axios';

export default {
    data(){
        return {
            store,
            doctor: null, 
        }
    },
    created() {
        this.getsingleDoctor(); 
    },
    methods: {
        getsingleDoctor() {
            axios.get(`${store.url}/doctors/${this.$route.params.slug}`).then(res => {  
                if(res.data.success) {
                    this.doctor = res.data.results; 
                }
            });
        }
    },
   
}
</script>

<template>
    <div class="container my-5">
         <div class="row align-items-center">
             <div class="col-12 col-md-4 text-center">
                <img class="img-doctor img-fluid" :src="doctor.thumb && doctor.thumb.startsWith('http') ? doctor.thumb : (doctor.thumb ? `http://127.0.0.1:8000/storage/${doctor.thumb}` : '')" :alt="`${doctor.user_surname}-image`">
             </div>
             <div class="col-12 col-md-8">
                <h2 class="fw-bolder">{{ doctor.user_name }} {{ doctor.user_surname }}</h2>
                <p class="text-muted">{{ doctor.address }}, {{ doctor.city }}</p>
                 <h3>Specializzazioni</h3>
                 <ul class="list-unstyled">
                    <li v-for="field in doctor.fields" :key="field.id">{{ field.name }}</li>
                </ul>
                 <h3>Contatti</h3>
                 <p>Telefono: {{ doctor.phone_number }}</p>
                 <h3>Descrizione</h3>
                 <p>{{ doctor.performance }}</p>
                 <a v-if="doctor.cv" :href="`http://127.0.0.1:8000/storage/${doctor.cv}`" target="_blank" class="btn btn-danger">
                    Visualizza CV
                </a>
             </div>
         </div>
    </div>
 </template>
 

<style lang="scss" scoped>
@import '../styles/generals.scss';    

</style>


