<script>
import DoctorReview from '../components/DoctorReview.vue';
import AppRedirect from '../components/AppRedirect.vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
    components: {
        DoctorReview,
        AppRedirect
    },
    data() {
        return {
            store,
            doctor: null,
            // MESSAGE
            name: '',
            surname: '',
            email: '',
            content: '',
            doctor_id: this.$route.params.id,
            sending: false,
            sentSuccess: false,
            sentTime: null,
            // REVIEW
            reviews: [],
            sendingReview: false,
            reviewSentSuccess: false,
            reviewSentTime: null,
            reviewName: '',
            reviewEmail: '',
            reviewContent: '',
            reviewRating: 0,
            reviewError: ''
        }
    },
    created() {
        this.getsingleDoctor();
        this.$router.afterEach((to) => {
            if (to.meta.title) {
                document.title = to.meta.title;
            }
        });
    },
    watch: {
        // titolo scheda in base ai dati del dotttore
        doctor(newDoctor) {
            if (newDoctor) {
                document.title = `BD - ${newDoctor.user_name} ${newDoctor.user_surname}`;
            }
        }
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
                    }, 3000)
                } else {
                    this.sending = false
                }
            })
        },
        // invio recensione
        sendReview() {
            this.sendingReview = true;

            // Controlla se il voto è stato selezionato
            if (this.reviewRating === 0) {
                this.reviewError = 'Devi fornire un voto prima di poter rilasciare la tua recensione!';
                this.sendingReview = false;
                return;
            }

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
                    this.reviewRating = 0; // Reset del voto a 0
                    this.sendingReview = false;
                    this.reviewError = ''; // Rimuove eventuali errori precedenti
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
            this.reviewError = ''; // Resetta il messaggio di errore quando l'utente seleziona un voto
            console.log(v)
        }
    },

}
</script>

<template>
    <div class="container-fluid doctor-profile">
        <div class="row">
            <div class="col-2">
                    <AppRedirect />
            </div>
            <div class="col-8">
                <div class="profile-image-container mx-auto my-5">
                    <img class="profile-image img-fluid" v-if="doctor && doctor.thumb"
                        :src="doctor.thumb.startsWith('http') ? doctor.thumb : `http://127.0.0.1:8000/storage/${doctor.thumb}`"
                        :alt="`${doctor.user_surname}-image`">

                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
                <div class="profile-info" v-if="doctor">
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="name">{{ doctor.user_name }} {{ doctor.user_surname }}</h2>
                        <p v-if="doctor.averageRating !== undefined && doctor.averageRating > 0" class="mb-0 avg-box d-flex justify-content-end align-items-center">
                            <i class="bi bi-star-fill me-2 text-warning star-preview"></i>
                            <strong class="avg">{{ doctor.averageRating.toFixed(1) }}</strong>
                            <span class="text-white">/5</span>
                        </p>
                    </div>
                    <p class="address fs-5">{{ doctor.address }}, {{ doctor.city }}</p>
                    <h3 class="fields-title">Specializzazioni</h3>
                    <ul class="fields list-unstyled">
                        <li v-for="field in doctor.fields" :key="field.id" class="fields-item">{{ field.name }}</li>
                    </ul>
                    <h3 class="profile-section-title mt-1">Contatti</h3>
                    <p class="contact mt-1 fs-5">Telefono: {{ doctor.phone_number }}</p>
                    <h3 class="profile-section-title mt-1">Descrizione</h3>
                    <p class="profile-description mt-1 fs-5">{{ doctor.performance }}</p>
                    <a v-if="doctor.cv" 
                        :href="doctor.cv.includes('storage') ? 
                                `http://127.0.0.1:8000/storage/${doctor.cv}` : 
                                `http://127.0.0.1:8000/curricula/${doctor.cv}`" 
                        target="_blank" 
                        class="btn btn-secondary fs-5 my-3">
                        Visualizza CV
                        </a>

                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
                <!-- FORM INVIO MESSAGGIO -->
                <form @submit.prevent="sendMessage" class="border border-3 rounded p-3">
                    <h3 class="fs-5 fw-bold text-uppercase my-3">Lascia un Messaggio</h3>
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
                        <button type="submit" class="showbtn w-25" :disabled="sending">{{ sending ? 'Invio...'
                            :
                            'Invia' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- TOAST DI BS -->
    <div v-if="sentSuccess" class="toast position-fixed" :class="{ show: sentSuccess }" role="alert" aria-live="assertive" aria-atomic="true">
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
    <div class="bg-comments p-3">
        <!-- FORM INVIO REVIEWS -->
        <div class="container-fluid review-form">
            <div class="row">
                <div class="col-12">
                    <form @submit.prevent="sendReview" class="border border-3 rounded p-3">
                        <h3 class="fs-5 fw-bold text-uppercase mb-4">Lascia una Recensione</h3>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-12">
                                <input v-model="reviewName" type="text" class="form-control mb-3"
                                    placeholder="Il tuo nome (facoltativo)" />
                            </div>
                            <div class="col-lg-6 col-md-6 col-12">
                                <input v-model="reviewEmail" type="email" class="form-control mb-3"
                                    placeholder="Inserisci email*" required />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <textarea v-model="reviewContent" rows="5" class="form-control my-3"
                                    placeholder="Scrivi la tua recensione*" required></textarea>
                            </div>
                            <div class="col-lg-6 col-md-6 col-12">
                                <div class="mb-3 text-center">
                                    <label for="rating" class="form-label fw-bold">Inserisci valutazione</label>
                                    <div class="star-rating text-center">
                                        <i v-for="vote in 5" :key="vote" class="bi-reviews"
                                            :class="['bi', vote <= reviewRating ? 'bi-star-fill' : 'bi-star']"
                                            @click="setRating(vote)"></i>
                                    </div>
                                    <p v-if="reviewError" class="text-danger mt-2">{{ reviewError }}</p>
                                </div>
                                <!-- FINE VOTAZIONE -->
                            </div>
                            <div class="col-lg-6 col-md-6 col-12">
                                <div class="text-center">
                                    <button type="submit" class="showbtn w-25 my-3" :disabled="sendingReview">{{
                                        sendingReview ? 'Invio...' : 'Invia' }}</button>
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
                    <div class="review-content">
                        <DoctorReview v-for="review in reviews" :key="review.id" :review="review" />
                    </div>
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

.doctor-profile, .review-form, .review-content {
    padding: 30px 170px;
    background-color: $light-gray;
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

        .avg-box {
            background-color: $light-blue;
            padding: 5px;
            border-radius: 8px;
            font-size: 20px;
            text-shadow: 1px 1px 2px $stars;
        }

        .star-preview {
            text-shadow: 1px 1px 2px white;
        }

        .avg {
            color: #fff;
        }

        .address,
        .contact,
        .profile-description {
            font-size: 1rem;
            color: $dark-grey;
            word-wrap: break-word;
            white-space: normal;
            overflow-wrap: break-word;
            max-width: 100%;
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

.review-content {
    padding: 30px 20px;
}

.bi-reviews {
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
    color: $stars;

    &:hover {
        color: $stars-hover;
    }
}

.bg-comments {
    background-color: $warm-grey;
}

@media screen and (max-width: 899px) {
    .doctor-profile, .review-form, .review-content {
        padding: 30px 20px;
    }

    .review-content {
        padding: 30px 10px;
    }
}
</style>
