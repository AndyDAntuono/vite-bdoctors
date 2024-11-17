<script>
export default {
    props: {
        doctor: Object
    },
    methods: {
        trText(text) {
            return text.substr(0, 80) + '...';
        }
    }
}
</script>

<template>
    <div class="col-12 col-lg-6 my-3">
        <div class="card h-100 flex-row align-items-center">
            <div class="img-container position-relative ms-1">
                <img class="card-img img-fluid" 
                     :src="doctor.thumb.startsWith('http') ? doctor.thumb : `http://127.0.0.1:8000/storage/${doctor.thumb}`" 
                     :alt="`${doctor.user_surname}-image`">
                <span v-if="doctor.sponsors && doctor.sponsors.length > 0" class="sponsored-badge">
                    <i class="bi bi-gem"></i> Sponsorizzato
                </span>
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <div>
                        <div class="d-flex align-items-center justify-content-between">
                            <!-- Nome e Cognome -->
                            <div>
                                <h5 class="card-title fw-bold">
                                    <i class="bi bi-person-fill text-white me-2"></i>
                                    {{ doctor.user_name }} {{ doctor.user_surname }}
                                </h5>
                            </div>
                    
                            <!-- Sezione Commenti e Media Voto -->
                            <div class="d-flex align-items-center">
                                <!-- Numero di Commenti -->
                                <div class="d-flex align-items-center fw-bold me-2 card-reviews">
                                    <span class="me-1">
                                        <i class="bi bi-chat-left-text-fill text-white"></i>
                                    </span>
                                    <span class="me-1">{{ doctor.reviews.length }}</span>
                                    <span class="md-none">Commenti</span>
                                </div>
                    
                                <!-- Media Voto con Icona Stella -->
                                <div v-if="doctor.average_rating !== undefined && !isNaN(doctor.average_rating)" class="d-flex align-items-center fw-bold card-rating">
                                    <i class="bi bi-star-fill me-1 text-warning "></i>
                                    {{ parseFloat(doctor.average_rating).toFixed(1) }}/5
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul v-if="doctor.fields && doctor.fields.length > 0" class="list-unstyled d-flex flex-wrap mb-2">
                        <li class="me-2 list d-flex align-items-center fw-bold" v-for="field in doctor.fields" :key="field.id">
                            <i class="bi bi-check-circle-fill me-2 text-white"></i> 
                            {{ field.name }}
                        </li>
                    </ul>
                    <span >
                        <i class="bi bi-geo-alt-fill me-2 text-white"></i> 
                        {{ doctor.address }} ({{ doctor.city.charAt(0).toUpperCase() + doctor.city.slice(1).toLowerCase() }})
                    </span>
                    <p class="card-text mt-2 fw-bold">
                        <i class="bi bi-pencil-fill me-2 text-white"></i>
                        {{ trText(doctor.performance) }}
                    </p>
                </div>
                <router-link 
                    :to="{ name: 'doctor', params: { slug: doctor.slug } }" 
                    class="text-decoration-none send align-self-start mt-3 d-flex align-items-center justify-content-center fw-bold">
                    Mostra il Profilo
                    <i class="bi bi-arrow-right ms-2 text-white fw-bold"></i> 
                </router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '../styles/generals.scss';

.card {
    display: flex;
    flex-direction: row;
    background-color: $navy-blue;
    color: $pure-white;
    border: none;
    box-shadow: 3px 3px 5px $dark-grey;
    transition: transform 0.5s ease, box-shadow 0.5s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 5px 5px 10px $dark-grey;
        cursor: pointer;
    }

    .img-container {
        width: 200px;          
        height: 200px;        
        padding: 5px;
        background-color: $navy-blue;
        border-radius: 10px;
        position: relative;    
        overflow: hidden;
        border: 2px solid white;

    }

    .card-img {
        width: 100%;           
        height: 100%;          
        object-fit: cover;     
        border-radius: 5px;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 15px;
        border-radius: 0 10px 10px 0;
    }

    .card-title {
        font-size: 15px;
        margin-bottom: 0.5rem;
    }

    .list {
        color: $aqua-green;
        font-size: 13px;
    }

    .card-text {
        font-size: 13px;
        color: $aqua-green;
    }

    .card-reviews{
        font-size: 12px;
    }

    .card-rating{
        font-size: 12px;
    }
}

.sponsored-badge {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;         
    gap: 5px;                    
    background-color: goldenrod;   
    color: $pure-white;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 5px;
    z-index: 10;

    .bi-star-fill {
        color: $pure-white;
    }
}

//Responsività
@media (max-width: 992px) {
    .card-title {
        font-size: 15px;
    }
    .card-text,
    .card-reviews {
        font-size: 13px;
    }
    .card-rating {
        font-size: 9px;
    }
    .img-container {
        width: 130px;
        height: 130px;
    }
}

@media (max-width: 768px) {
    .card {
        flex-direction: column;
    }
    .card-title {
        font-size: 14px;
    }
    .card-text,
    .card-reviews {
        font-size: 12px;
    }
    .card-rating {
        font-size: 8px;
    }
    .img-container {
        width: 120px;
        height: 120px;
    }

    .md-none{
        display: none;
    }
}

@media (max-width: 576px) {
    .card-title {
        font-size: 13px;
    }
    .card-text,
    .card-reviews {
        font-size: 11px;
    }
    .card-rating {
        font-size: 7px;
    }
    .img-container {
        width: 100px;
        height: 100px;
    }
    .md-none{
        display: none;
    }
}

@media (max-width: 375px) {
    .card-title {
        font-size: 10px;
    }
    .card-text {
        font-size: 8px;
    }
    .card-rating {
        font-size: 6px;
    }
    .card-reviews{
        font-size: 6px;
    }
    .img-container {
        width: 90px;
        height: 90px;
    }

    .md-none{
        display: none;
    }
}
</style>
