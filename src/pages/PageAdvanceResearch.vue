<script>
import { store } from '../store.js';
import axios from 'axios';
import DoctorSearch from '../components/DoctorSearch.vue';
import AppRedirect from '../components/AppRedirect.vue';

export default {
    components: {
        DoctorSearch,
        AppRedirect
    },
    data() {
        return {
            store,
            user_name: '',
            user_surname: '',
            city: '',
            phone: '',
            averageVote: '',
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
                console.log(res.data.results)
                store.all_doctors = Object.values(res.data.results);
                store.filteredDoctors = [...store.all_doctors];
                console.log(store.filteredDoctors)
            });
        },

        getFields() {
            let fieldsurl = `${store.url}/fields`;
            axios.get(fieldsurl).then((res) => {
                console.log(res.data.results);
                store.fields_list = res.data.results;
            });
        },

        searchDoctors() {
            // Se tutti i campi sono vuoti, mostra la lista completa di medici
            if (!this.user_name && !this.user_surname && !this.city && !this.phone && !this.store.selectedField && !this.averageVote) {
                store.filteredDoctors = [...store.all_doctors].sort((a, b) => {
                    const sponsorA = a.sponsors?.[0]?.pivot?.expiring_date;
                    const sponsorB = b.sponsors?.[0]?.pivot?.expiring_date;

                    if (!sponsorA && !sponsorB) return 0; // Nessuna sponsorizzazione
                    if (!sponsorA) return 1;              // A senza sponsorizzazione
                    if (!sponsorB) return -1;             // B senza sponsorizzazione

                    // Confronta le date in ordine decrescente
                    return new Date(b.sponsors[0].pivot.expiring_date) - new Date(a.sponsors[0].pivot.expiring_date);
                });
                return;
            }

            // Filtra i medici in base ai criteri di ricerca
            store.filteredDoctors = store.all_doctors.filter((doc) => {
                let matches = true;

                // Filtra per nome: verifica se 'user_name' è incluso in 'doc.user_name' (case-insensitive)
                if (this.user_name && !doc.user_name.toLowerCase().includes(this.user_name.toLowerCase())) {
                    matches = false;
                }

                // Filtra per cognome: verifica se 'user_surname' è incluso in 'doc.user_surname' (case-insensitive)
                if (this.user_surname && !doc.user_surname.toLowerCase().includes(this.user_surname.toLowerCase())) {
                    matches = false;
                }

                // Filtra per città: verifica se 'city' è incluso in 'doc.city' (case-insensitive)
                if (this.city && !doc.city.toLowerCase().includes(this.city.toLowerCase())) {
                    matches = false;
                }


                // Filtra per specializzazione (selectedField):
                // Usa `some()` per controllare se almeno una specializzazione corrisponde a quella selezionata (case-insensitive)
                if (this.store.selectedField && (!doc.fields || !doc.fields.some(field => field.name.toLowerCase() === this.store.selectedField.toLowerCase()))) {
                    matches = false;
                }

                // Filtra per media voto (averageVote):
                // Verifica che 'averageVote' sia uguale al valore arrotondato di 'doc.average_rating'
                if (this.averageVote && (!doc.average_rating || Math.round(doc.average_rating) !== parseInt(this.averageVote))) {
                    matches = false;
                }

                return matches; // Ritorna true se il dottore soddisfa tutti i criteri di filtro
            });
            store.filteredDoctors = store.filteredDoctors.sort((a, b) => {
                const sponsorA = a.sponsors?.[0]?.pivot?.expiring_date;
                const sponsorB = b.sponsors?.[0]?.pivot?.expiring_date;

                if (!sponsorA && !sponsorB) return 0;
                if (!sponsorA) return 1;
                if (!sponsorB) return -1;

                return new Date(b.sponsors[0].pivot.expiring_date) - new Date(a.sponsors[0].pivot.expiring_date);
            })
        }

    }
};
</script>

<template>
    <div class="par-bg">
        <div class="container py-5">
            <div class="row">
                <div class="col-2">
                    <AppRedirect />
                </div>
                <div class="col-8">
                    <h1 class="text-center my-4 title">Ricerca avanzata</h1>
                </div>
                <div class="col-12">
                    <form class="py-4 px-3 rounded" @submit.prevent="searchDoctors">
                        <div class="row">
                            <div class="col-12 col-md-6 col-lg-4 mb-3">
                                <i class="bi bi-person-fill text-white me-2"></i>
                                <label for="name" class="form-label fw-bold">Nome</label>
                                <input v-model="user_name" type="text" class="form-control" id="name"
                                    placeholder="Inserisci il nome">
                            </div>
                            <div class="col-12 col-md-6 col-lg-4 mb-3">
                                <i class="bi bi-person-fill text-white me-2"></i>
                                <label for="surname" class="form-label fw-bold">Cognome</label>
                                <input v-model="user_surname" type="text" class="form-control" id="user_surname"
                                    placeholder="Inserisci il cognome">
                            </div>

                            <div class="col-12 col-md-6 col-lg-4 mb-3">
                                <i class="bi bi-geo-alt-fill me-2 text-white"></i>
                                <label for="city" class="form-label fw-bold">Città</label>
                                <input v-model="city" type="text" class="form-control" id="city"
                                    placeholder="Inserisci la città">
                            </div>
                            <div class="col-12 col-md-6 col-lg-4 mb-3">
                                <i class="bi bi-check-circle-fill me-2 text-white"></i>
                                <label for="fields" class="form-label fw-bold">Specializzazione</label>
                                <select class="form-select" aria-label="select" v-model="store.selectedField">
                                    <option value="">Seleziona specializzazione</option>
                                    <option v-for="(field, i) in store.fields_list" :key="`field-${i}`"
                                        :value="field.name">
                                        {{ field.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4 mb-3">
                                <i class="bi bi-star-fill me-2 text-white"></i>
                                <label for="average-vote" class="form-label fw-bold">Media Voto</label>
                                <select v-model="averageVote" class="form-select" id="averageVote">
                                    <option value="">Seleziona media voto</option>
                                    <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                                </select>
                            </div>
                            <div class="col-12 mt-4">
                                <div class="d-flex justify-content-center">
                                    <button type="submit" class="px-3 send">
                                        <strong><i class="bi bi-search"></i> Cerca</strong>
                                    </button>
                                </div>
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
    </div>

</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

.par-bg {
    background-color: $light-gray;
}

h1 {
    color: $navy-blue;
}

title {
    color: $navy-blue;
}

form {
    background-color: $navy-blue;
    color: $pure-white;
    box-shadow: 2px 2px 5px $dark-grey;
}

.par-bg-button {
    background-color: $aqua-green;
}

.par-bg-button:hover {
    background-color: $mint-green;
    color: $navy-blue;
}
</style>
