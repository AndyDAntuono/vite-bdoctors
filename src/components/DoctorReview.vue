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
        <h5>{{ review.name }}</h5>
        <p class="text-muted">{{ review.email }}</p>
        <p>{{ review.content }}</p>
    </div>
</template>


<style lang="scss" scoped>
@import '../styles/generals.scss';

.review-card {
    border: 1px solid #e0e0e0;
    padding: 1rem;
    border-radius: 5px;
    background-color: #f9f9f9;
}
</style>
