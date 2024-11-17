<script>
export default {
    props: {
        doctor: Object
    },
    methods: {
        trText(text) {
            return text.substr(0, 100) + '...';
        }
    }
}
</script>

<template>
    <div class="col-12 my-3">
        <div class="card h-100 flex-row align-items-center">
            <div class="img-container position-relative">
                <img class="card-img img-fluid" 
                     :src="doctor.thumb.startsWith('http') ? doctor.thumb : `http://127.0.0.1:8000/storage/${doctor.thumb}`" 
                     :alt="`${doctor.user_surname}-image`">
                <span v-if="doctor.sponsors && doctor.sponsors.length > 0" class="sponsored-badge">
                    <i class="bi bi-star-fill"></i> Sponsorizzato
                </span>
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 class="card-title fw-bold">
                        <i class="bi bi-person-fill text-white me-2"></i>
                        {{ doctor.user_name }} {{ doctor.user_surname }}
                    </h5>
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
        font-size: 20px;
        margin-bottom: 0.5rem;
    }

    .list {
        color: $aqua-green;
    }

    .card-text {
        font-size: 15px;
        color: $aqua-green;
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
</style>
