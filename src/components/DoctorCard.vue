<script>
export default {
    props: {
        doctor: Object
    },
    methods: {
        trText(text) {
            return text.length > 20 ? text.substr(0, 20) + '...' : text;
        },

        trAdress(text) {
            return text.length > 15 ? text.substr(0, 15) + '...' : text;
        },

        trFields(text) { 
            return text.length > 20 ? text.substr(0, 20) + '...' : text;
        }
    }
}
</script>
<template>
    <div class="col-12 col-md-6 col-lg-4 mt-5 mb-3">
        <div class="card h-100">
            <div class="img-container mx-auto position-relative">
                <img class="card-img-top img-fluid" :src="doctor.thumb.startsWith('http') ? doctor.thumb : `http://127.0.0.1:8000/storage/${doctor.thumb}`" :alt="`${doctor.user_surname}-image`">
                <span v-if="doctor.sponsors && doctor.sponsors.length > 0" class="sponsored-badge">
                    <i class="bi bi-star-fill me-1"></i> Sponsorizzato
                </span>
            </div>
            <div class="card-body">
                <div class="card-title fw-bolder">
                    <i class="bi bi-person-fill text-white"></i>
                    {{ doctor.user_name }} {{ doctor.user_surname }}
                </div>
                <ul v-if="doctor.fields && doctor.fields.length > 0" class="list-unstyled d-flex flex-wrap">
                    <li class="card-text me-2 fw-bold list d-flex align-items-center">
                        <i class="bi bi-check-circle-fill me-2 text-white"></i> {{trFields( doctor.fields[0].name )}}
                    </li>
                </ul>
                <span class="fw-normal">
                    <i class="bi bi-geo-alt-fill me-2 text-white"></i>
                    {{ trAdress( doctor.address) }} ({{ doctor.city.charAt(0).toUpperCase() + doctor.city.slice(1).toLowerCase() }})
                </span>
                <p class="card-text fw-bold py-2">
                    <i class="bi bi-pencil-fill me-2 text-white"></i>
                    {{ trText(doctor.performance) }}
                </p>
                <router-link :to="{ name: 'doctor', params: { slug: doctor.slug } }" class="show text-decoration-none mt-2 d-flex align-items-center justify-content-center fw-bold">
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
    min-height: 100px;
    background-color: $navy-blue;
    color: $pure-white;
    border: none;
    box-shadow: 3px 3px 5px $dark-grey;
    transition: transform 0.5s ease, box-shadow 0.5s ease; 

    &:hover {
        transform: translateY(5px); 
        box-shadow: 5px 5px 10px $dark-grey; 
        cursor: pointer;
    }

    .img-container {
        width: 150px;          
        height: 150px;          
        padding: 5px; 
        background-color: $navy-blue; 
        border-radius: 10px; 
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin: auto; 
    }

    .card-img-top {
        width: 100%;            
        height: 100%;          
        object-fit: cover;      
        border-radius: 5px;
    }

    .card-body {
        background-color: $navy-blue;
        border-radius: 10px; 
    }

    .card-title {
        font-size: 1.25rem;  
        letter-spacing: 1px;
    }

    .list {
        color: $aqua-green;
    }

    .card-text {
        font-size: 0.9375rem; 
        color: $aqua-green;
    }
}

.sponsored-badge {
    position: absolute;
    bottom: 10px;
    background-color: goldenrod;   
    color: $pure-white;
    padding: 5px 10px;
    font-size: 0.75rem; 
    font-weight: bold;
    border-radius: 5px;
    z-index: 10;

    .bi-star-fill {
        color: $pure-white;           
    }
}

/* Media Queries for Font Sizes */
@media (max-width: 1200px) { 
    .card-title {
        font-size: 1.2rem; 
    }

    .card-text {
        font-size: 0.75rem; 
    }

    .sponsored-badge {
        font-size: 0.75rem; 
    }
}

@media (max-width: 992px) { 
    .card-title {
        font-size: 1.125rem; 
    }

    .card-text {
        font-size: 0.875rem; 
    }

    .sponsored-badge {
        font-size: 0.6875rem; 
    }
}

@media (max-width: 768px) { 
    .card-title {
        font-size: 1rem; 
    }

    .card-text {
        font-size: 0.8125rem; 
    }

    .sponsored-badge {
        font-size: 0.625rem; 
    }
}

@media (max-width: 576px) { 
    .card-title {
        font-size: 0.9375rem; 
    }

    .card-text {
        font-size: 0.75rem; 
    }

    .sponsored-badge {
        font-size: 0.625rem; 
    }
}

</style>