<script>
import { store } from '../store';
export default {
    computed: {
        isLoading() {
            console.log('Loader state:', store.isLoading);
            return store.isLoading;
        }
    }
}
</script>
<template>
    <div v-if="isLoading" class="ecg-loader-overlay d-flex flex-column justify-content-center align-items-center">
        <div class="ecg-line"></div>
        <p class="fw-bolder pt-3 fs-5">Caricamento...</p>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';
.ecg-loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(232, 232, 232, 0.8);
    z-index: 9999;
}

.ecg-line {
    position: relative;
    width: 300px;
    height: 100px;
    overflow: hidden;
}

.ecg-line::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background-image: url('/pngegg.png');
    background-size: contain;
    background-repeat: repeat-x;
    filter: brightness(0) saturate(100%) invert(32%) sepia(81%) saturate(757%) hue-rotate(189deg) brightness(87%) contrast(102%);
    animation: ecg-move 2s linear infinite;
}

p {
    color: $navy-blue;
}

@keyframes ecg-move {
    from {
        transform: translateX(0%);
    }

    to {
        transform: translateX(-50%);
    }
}
</style>