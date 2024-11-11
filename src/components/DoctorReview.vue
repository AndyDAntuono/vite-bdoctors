<script>
export default {
    name: "DoctorReview",
    props: {
        review: {
            type: Object,
            
        }
    }
};
</script>

<template>
    <div class="review-card my-2">
        <div class="d-flex align-items-center">
            <i class="bi bi-person-fill me-2 text-primary"></i>
            <h5 class="review-name">{{ review.name }}</h5>
        </div>
        <div class="d-flex align-items-center text-muted">
            <i class="bi bi-envelope-fill me-2"></i>
            <p class="review-email mb-0">{{ review.email }}</p>
        </div>
        <p class="review-content mt-3">{{ review.content }}</p>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';


.review-card {
    border: 1px solid $light-gray;
    padding: 1rem;
    border-radius: 8px;
    background-color: $light-blue;

    .review-name {
        font-size: 1.5rem;
        font-weight: bold;
        color: $navy-blue;
    }

    .review-email {
        font-size: 1 rem;
        color: $dark-grey;
    }

    .review-content {
        font-size: 1rem;
        color: $dark-grey;
        line-height: 1.5;
    }


}
</style>
