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
        <div class="card min-h">
            <div class="box-avatars mx-auto">
                <img class="card-img-top img-fluid" :src="doctor.thumb.startsWith('http') ? doctor.thumb : `http://127.0.0.1:8000/storage/${doctor.thumb}`" :alt="`${doctor.user_surname}-image`">
            </div>
            <div class="card-body">
                <div class="card-title fw-bolder">{{ doctor.user_name}} {{doctor.user_surname}}</div>
                <ul v-if="doctor.fields && doctor.fields.length > 0" class="list-unstyled d-flex flex-wrap">
                    <li class="card-text me-2 fw-bold list" v-for="field in doctor.fields">{{field.name}}</li>
                </ul>
                <span>{{doctor.address}} ({{ doctor.city.charAt(0).toUpperCase() + doctor.city.slice(1).toLowerCase() }})</span>
                <p class="card-text">{{trText(doctor.performance)}}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';

.min-h {
    min-height: 500px;
    background-color: $navy-blue;
    color: $pure-white;
    border: none;
    box-shadow: 3px 3px 5px $dark-grey;
    .box-avatars {
        width: 300px;
        height: 300px;
        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }
    .card-title {
        font-size: 24px;
        letter-spacing: 1px;
    }

    .list {
        color: $aqua-green;
    }
}

</style>