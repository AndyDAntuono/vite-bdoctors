<script>
import { setTransitionHooks } from 'vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            doctor: null,
            name: '',
            surname: '',
            email: '',
            content: '',
            doctor_id: this.$route.params.id,
            sending: false,
            sentSuccess: false,
            sentTime: null
        }
    },
    created() {
        this.getsingleDoctor();
    },
    methods: {
        getsingleDoctor() {
            axios.get(`${store.url}/doctors/${this.$route.params.slug}`).then(res => {
                if (res.data.success) {
                    this.doctor = res.data.results;
                }
            });
        },
        sendMessage() {
            this.sending = true;
            const message = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                content: this.content,
                doctor_id: this.doctor.id
            }

            axios.post(`${store.url}/messages`, message).then((res) => {
                if (res.data.success) {
                    this.content = '';
                    this.name = '';
                    this.surname = '';
                    this.email = '';
                    this.sending = false
                    this.sentSuccess = true
                    this.sentTime = new Date().toLocaleString();
                    setTimeout(() => {
                        this.sentSuccess = false
                    }, 5000)
                } else {
                    this.sending = false
                }
            })
        }
    },

}
</script>

<template>
    <div class="container my-5 doctor-profile">
        <div class="row">
            <div class="col-lg-8 d-flex flex-row align-items-start">
                <div class="profile-image-container">
                    <img class="profile-image img-fluid"
                    v-if="doctor && doctor.thumb" :src="doctor.thumb.startsWith('http') ? doctor.thumb : `http://127.0.0.1:8000/storage/${doctor.thumb}`" :alt="`${doctor.user_surname}-image`">
                        
                </div>
                <div class="profile-info" v-if="doctor">
                    <h2 class="name">{{ doctor.user_name }} {{ doctor.user_surname }}</h2>
                    <p class="address">{{ doctor.address }}, {{ doctor.city }}</p>
                    <h3 class="fields-title">Specializzazioni</h3>
                    <ul class="fields list-unstyled">
                        <li v-for="field in doctor.fields" :key="field.id" class="fields-item">{{ field.name }}</li>
                    </ul>
                    <h3 class="profile-section-title mt-1">Contatti</h3>
                    <p class="contact mt-1">Telefono: {{ doctor.phone_number }}</p>
                    <h3 class="profile-section-title mt-1">Descrizione</h3>
                    <p class="profile-description mt-1">{{ doctor.performance }}</p>
                    <a v-if="doctor.cv" :href="`http://127.0.0.1:8000/storage/${doctor.cv}`" target="_blank"
                        class="btn btn-secondary fs-5 mt-3">
                        Visualizza CV
                    </a>
                </div>
            </div>
            <div class="col-lg-4 p-3">
                <h3 class="fs-5 fw-bold text-uppercase">Lascia un Messaggio</h3>
                <form @submit.prevent="sendMessage">
                    <div class="mb-3">
                        <input v-model="name" type="text" class="form-control" placeholder="Il tuo nome" required />
                    </div>
                    <div class="mb-3">
                        <input v-model="surname" type="text" class="form-control" placeholder="Il tuo cognome"
                            required />
                    </div>
                    <div class="mb-3">
                        <input v-model="email" type="email" class="form-control" placeholder="Inserisci email" required />
                    </div>
                    <div class="mb-3">
                        <textarea v-model="content" rows="5" class="form-control"
                            placeholder="Scrivi il tuo messaggio..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-100" :disabled="sending">{{sending ? 'Invio in corso...' : 'Invia messaggio'}}</button>
                
                </form>
            </div>
        </div>
    </div>

    <!-- TOAST DI BS -->
    <div v-if="sentSuccess" class="toast show position-fixed" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto toast-title">Messaggio inviato!</strong>
          <small>{{sentTime}}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="sentSuccess = false"></button>
        </div>
        <div class="toast-body">
          Il messaggio è stato inviato con successo! Verrai contattato al più presto!
        </div>
      </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

.doctor-profile {
    .profile-image-container {
        max-width: 250px;
        margin-right: 20px;
    }

    .profile-image {
        width: 100%;
        border: 3px solid $aqua-green;
        padding: 5px;
        border-radius: 20px;

    }

    .profile-info {
        .name {
            font-size: 2rem;
            font-weight: bold;
        }

        .address,
        .contact,
        .profile-description {
            font-size: 1rem;
            color: $dark-grey;
        }

        .fields-title,
        .profile-section-title {
            font-size: 1.2rem;
            font-weight: bold;
        }

        .fields {
            .fields-item {
                font-size: 1rem;
                color: $navy-blue;
                font-weight: bold;
            }
        }
    }
}

.toast {
    background-color: $navy-blue;
    bottom: 20px;
    right: 20px;
    .toast-header {
        background-color: $navy-blue;
        border-bottom: 1px solid $pure-white;
    }
    .toast-header, .toast-body {
        color: $pure-white;
    }
}
</style>
