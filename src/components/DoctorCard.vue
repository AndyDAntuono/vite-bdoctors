<script>
export default {
    props: {
        doctor: Object
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
                <div class="card-title">{{ doctor.user_name}} {{doctor.user_surname}}</div>
                <ul v-if="doctor.fields && doctor.fields.length > 0" class="list-unstyled d-flex">
                    <li class="card-text me-2 fw-bold" v-for="field in doctor.fields">{{field.name}}</li>
                </ul>
                <p class="card-text">{{doctor.performance}}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';
.min-h {
    min-height: 500px;
}

.box-avatars {
    width: 300px;
    height: 300px;
    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
}
</style>