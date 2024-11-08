<script>
import { store } from '../store';
import axios from 'axios';
export default {
    // DATA inizializzare doctor a '' e usare lo store
    // METHODS getter dei dettagli del doctor con axios all'endopoint url dei dottori + il parametro dello slug:
    // this.$route.params.slug
    // CREATED richiamare metodo
}
</script>
<template>
    <template>
        <div class="container my-5">
            <div class="row">
                <div class="col-12 col-md-4 text-center">
                    <img :src="doctor.thumb" alt="doctor-profile-image" class="img-fluid rounded-circle mb-3">
                    <h2>{{ doctor.user_name }} {{ doctor.user_surname }}</h2>
                    <p class="text-muted">{{ doctor.address }}, {{ doctor.city }}</p>
                </div>
                <div class="col-12 col-md-8">
                    <h3>Specializzazioni</h3>
                    <ul class="list-unstyled">
                        <li v-for="field in doctor.fields" :key="field.id">{{ field.name }}</li>
                    </ul>
                    
                    <h3>Contatti</h3>
                    <p>Telefono: {{ doctor.phone_number }}</p>
    
                    <h3>Descrizione</h3>
                    <p>{{ doctor.performance }}</p>
                </div>
            </div>
        </div>
    </template>
</template>
<style lang="scss" scoped>
    
</style>


