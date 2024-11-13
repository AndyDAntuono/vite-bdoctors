<script>
import DoctorReview from '../components/DoctorReview.vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
    components: {
        DoctorReview,
    },
    data() {
        return {
            store,
            doctor: null,
            //MESSAGE
            name: '',
            surname: '',
            email: '',
            content: '',
            doctor_id: this.$route.params.id,
            sending: false,
            sentSuccess: false,
            sentTime: null,
            //REVIEW
            reviews: [],
            sendingReview: false,
            reviewSentSuccess: false,
            reviewSentTime: null,
            reviewName: '',
            reviewEmail: '',
            reviewContent: '',
            reviewRating: 1
        }
    },
    created() {
        this.getsingleDoctor();
    },
    methods: {
        // recupera il doc con lo slug
        getsingleDoctor() {
            axios.get(`${store.url}/doctors/${this.$route.params.slug}`).then(res => {
                console.log(res.data);
                if (res.data.success) {
                    this.doctor = res.data.results;
                    this.reviews = res.data.results.reviews;
                    //calcolo media
                    this.calculateAverageRating();
                }
            });
        },
        //calcolo media voti
        calculateAverageRating() {
            if (this.reviews.length === 0) {
                // Se non ci sono recensioni, la media è 0
                this.doctor.averageRating = 0;
            } else {
                // Calcolare la somma dei voti e la media:
                const totalVotes = this.reviews.reduce((sum, single_review) => sum + (single_review.vote || 0), 0); // con reduce riduco l'array reviews a un valore: 0 è valore iniziale per la somma, che a ogni iterazione verrà aggiornato sommandolo al voto della singola recensione iterata
                this.doctor.averageRating = totalVotes / this.reviews.length; //qui sto solo eseguendo il calcolo finale per la media dei voti
            }
        },
        //invio msgg
        sendMessage() {
            this.sending = true;
            const message = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                content: this.content,
                doctor_id: this.doctor.id
            }

            axios.post(`${store.url}${store.messages}`, message).then((res) => {
                if (res.data.success) {
                    //pulisco il modulo dopo l'invio del messaggio
                    this.content = '';
                    this.name = '';
                    this.surname = '';
                    this.email = '';
                    this.sending = false
                    this.sentSuccess = true
                    this.sentTime = new Date().toLocaleString();
                    // avvenuto invio dopo 5s
                    setTimeout(() => {
                        this.sentSuccess = false
                    }, 5000)
                } else {
                    this.sending = false
                }
            })
        },
        // invio recensione
        sendReview() {
            this.sendingReview = true;
            //'utente' + numeri casuali in caso non venga scritto alcun nome
            if (!this.reviewName) {
                this.reviewName = 'Utente' + Math.floor(Math.random() * 10000);
            }
            // oggetto review da inviare a back
            const review = {
                name: this.reviewName,
                email: this.reviewEmail,
                content: this.reviewContent,
                vote: this.reviewRating,
                doctor_id: this.doctor.id
            };

            axios.post(`${store.url}${store.reviews}/${this.doctor.slug}`, review).then((res) => {
                console.log(res.data.review);
                if (res.data.success) {
                    this.reviews.push(res.data.review);
                    this.calculateAverageRating();
                    //pulisco il modulo dopo l'invio della recensione
                    this.reviewName = '';
                    this.reviewEmail = '';
                    this.reviewContent = '';
                    this.reviewRating = 0;
                    this.sendingReview = false;
                    this.reviewSentSuccess = true;
                    this.reviewSentTime = new Date().toLocaleString();
                    // avvenuto invio dopo 5s
                    setTimeout(() => {
                        this.reviewSentSuccess = false;
                    }, 5000);
                } else {
                    this.sendingReview = false;
                }
            });
        },
        // setting del voto
        setRating(v) {
            this.reviewRating = v < 1 ? 1 : v; // Imposta `reviewRating` a 1 se `v` è inferiore a 1
            console.log(v)
        }
    },

}
</script>

<template>
    <div class="container my-5 doctor-profile">
        <div class="row">
            <div class="col-12">
                <div class="profile-image-container mx-auto my-5">
                    <img class="profile-image img-fluid"
                    v-if="doctor && doctor.thumb" :src="doctor.thumb.startsWith('http') ? doctor.thumb : `http://127.0.0.1:8000/storage/${doctor.thumb}`" :alt="`${doctor.user_surname}-image`">
                        
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
                <div class="profile-info" v-if="doctor">
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="name">{{ doctor.user_name }} {{ doctor.user_surname }}</h2>
                        <p v-if="doctor.averageRating !== undefined && doctor.averageRating > 0" class="mb-0 me-3">
                            Voti: <strong class="avg">{{ doctor.averageRating.toFixed(1) }}</strong>/5
                        </p>
                    </div>
                    <p class="address">{{ doctor.address }}, {{ doctor.city }}</p>
                    <h3 class="fields-title">Specializzazioni</h3>
                    <ul class="fields list-unstyled">
                        <li v-for="field in doctor.fields" :key="field.id" class="fields-item">{{ field.name }}</li>
                    </ul>
                    <h3 class="profile-section-title mt-1">Contatti</h3>
                    <p class="contact mt-1">Telefono: {{ doctor.phone_number }}</p>
                    <h3 class="profile-section-title mt-1">Descrizione</h3>
                    <p class="profile-description mt-1">{{ doctor.performance }}</p>
                    <a v-if="doctor.cv && !doctor.cv.startsWith('https://example')" :href="`http://127.0.0.1:8000/storage/${doctor.cv}`" 
                    target="_blank" class="btn btn-secondary fs-5 my-3">
                    Visualizza CV
                    </a>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
               <!-- FORM INVIO MESSAGGIO -->
                <h3 class="fs-5 fw-bold text-uppercase my-3">Lascia un Messaggio</h3>
                <form @submit.prevent="sendMessage">
                    <div class="mb-3">
                        <input v-model="name" type="text" class="form-control" placeholder="Il tuo nome" />
                    </div>
                    <div class="mb-3">
                        <input v-model="surname" type="text" class="form-control" placeholder="Il tuo cognome"
                            required />
                    </div>
                    <div class="mb-3">
                        <input v-model="email" type="email" class="form-control" placeholder="Inserisci email"
                            required />
                    </div>
                    <div class="mb-3">
                        <textarea v-model="content" rows="5" class="form-control"
                            placeholder="Scrivi il tuo messaggio..." required></textarea>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="send w-25" :disabled="sending">{{sending ? 'Invio in corso...' : 'Invia'}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- TOAST DI BS -->
    <div v-if="sentSuccess" class="toast show position-fixed" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto toast-title">Messaggio inviato!</strong>
            <small>{{ sentTime }}</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"
                @click="sentSuccess = false"></button>
        </div>
        <div class="toast-body">
            Il messaggio è stato inviato con successo! Verrai contattato al più presto!
        </div>
    </div>
    <div class="bg-comments">
            <!-- FORM INVIO REVIEWS -->
    <div class="container">
        <div class="row">
            <div class="col-12 p-3">
                <h3 class="fs-5 fw-bold text-uppercase mb-4">Lascia una Recensione</h3>
                <form @submit.prevent="sendReview">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-12">
                            <input v-model="reviewName" type="text" class="form-control mb-3" placeholder="Il tuo nome (facoltativo)"/>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                            <input v-model="reviewEmail" type="email" class="form-control mb-3" placeholder="Inserisci email*" required />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <textarea v-model="reviewContent" rows="5" class="form-control my-3" placeholder="Scrivi la tua recensione*" required></textarea>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                            <div class="mb-3 text-center">
                                <label for="rating" class="form-label fw-bold">Inserisci valutazione</label>
                                <div class="star-rating text-center">
                                    <i v-for="vote in 5" :key="vote" :class="['bi', vote <= reviewRating ? 'bi-star-fill' : 'bi-star']" @click="setRating(vote)"></i>
                                </div>
                            </div>
                            <!-- FINE VOTAZIONE -->
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                            <div class="text-center">
                                <button type="submit" class="send w-25 my-3" :disabled="sendingReview">{{ sendingReview ? 'Invio in corso...' : 'Invia' }}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Sezione recensioni -->
    <div class="container mt-3">
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    Recensioni:
                </h3>
            </div>
            <div class="col-12" v-if="reviews && reviews.length > 0">
                <DoctorReview v-for="review in reviews" :key="review.id" :review="review" />
            </div>
            <div class="col-12" v-else>
                <h4 class="text-danger text-center my-4">Nessuna recensione</h4>
            </div>
        </div>
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

        .avg {
            color: $stars;
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

    .toast-header,
    .toast-body {
        color: $pure-white;
    }
}

.bi {
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
    color: $stars;

    &:hover {
        color: $stars-hover;
    }
}

.bg-comments{
    background-color: $warm-grey;
}
</style>
