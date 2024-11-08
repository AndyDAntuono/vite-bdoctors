<script>
export default {
    props: {
        doctor: Object
    },
    methods: {
        trText(text) {
            return text.substr(0, 50)+'...';
        }
    }
}
</script>
<template>
    <div class="col-12 col-md-6 col-lg-4 mt-5">
        <div class="card h-100">
            <div class="img-container mx-auto">
                <img class="card-img-top img-fluid" :src="doctor.thumb.startsWith('http') ? doctor.thumb : `http://127.0.0.1:8000/storage/${doctor.thumb}`" :alt="`${doctor.user_surname}-image`">
            </div>
            <div class="card-body">
                <div class="card-title fw-bolder">{{ doctor.user_name}} {{doctor.user_surname}}</div>
                <ul v-if="doctor.fields && doctor.fields.length > 0" class="list-unstyled d-flex flex-wrap">
                    <li class="card-text me-2 fw-bold list" v-for="field in doctor.fields">{{field.name}}</li>
                </ul>
                <span>{{doctor.address}} ({{ doctor.city.charAt(0).toUpperCase() + doctor.city.slice(1).toLowerCase() }})</span>
                <p class="card-text fw-bold py-2">{{trText(doctor.performance)}}</p>
                <router-link :to="{ name: 'doctor', params: { slug: doctor.slug } }" class="btn btn-primary mt-3">
                    Mostra il Profilo
                </router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';

.card {
    min-height: 150px;
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
        padding: 5px; 
        background-color: $navy-blue; 
        border-radius: 10px; 
        max-width: 80%; 
    }

    .card-img-top {
        border-radius: 5px; 
        width: 100%;
    }

    .card-body {
        background-color: $navy-blue;
        border-radius: 10px; 
    }

    .card-title {
        font-size: 24px;
        letter-spacing: 1px;
    }

    .list {
        color: $aqua-green;
    }

    .card-text{
        font-size: 15px;
    }
}


</style>