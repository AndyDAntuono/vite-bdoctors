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
    <div class="review-card my-4">
        <div class="d-flex">
            <i class="bi bi-person-fill me-2 text-primary"></i>
            <h5 class="review-name">{{ review.name }}</h5>
        </div>
        <div class="review-rating mt-1">
            <span v-for="star in 5" :key="star" class="me-1">
                <i :class="star <= review.vote ? 'bi bi-star-fill' : 'bi bi-star'" class="text-warning"></i>
            </span>
        </div>
        <hr class="my-3 custom-hr" />
        <p class="review-content mt-1">{{ review.content }}</p>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

// Nuovi colori
$card-bg-color: #f5f7fa;
$primary-text-color: #333333;
$secondary-text-color: #4a90e2;
$separator-color: #d1d8e0;

.review-card {
    border: 1.5px solid $separator-color;
    padding: 1rem;
    border-radius: 5px;
    background-color: $card-bg-color;

    .review-name {
        font-size: 1.1rem;
        font-weight: lighter;
        color: $secondary-text-color;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .review-content {
        font-size: 1rem;
        line-height: 1.5;
        color: $primary-text-color;
        font-weight: normal;
        //text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
}

.custom-hr {
    height: 3px;
    width: 100%;
    background-color: $separator-color;
    border: none;
    margin: 1.5rem auto;
}

.review-rating i {
    font-size: 1.2rem;
    color: $stars; 
    transition: color 0.3s;
}
</style>
