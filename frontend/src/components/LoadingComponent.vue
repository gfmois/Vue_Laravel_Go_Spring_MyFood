<script>
import { ref, reactive, computed } from "vue";
import { Vue3Lottie } from "vue3-lottie"
import loading_json from "../assets/json/animation.json"
export default {
    props: {
        site: String,
        hasData: Boolean
    },
    setup(props) {
        const state = reactive({ value: props.hasData })

        const hasData = computed({
            get: () => state.value,
            set: (nValue) => state.value = nValue
        })

        return { site: props.site, state, loading_json, hasData }
    },
    components: {
        Vue3Lottie
    }
}
</script>

<template>
    <div class="wrapper" v-if="!hasData.value">
        <div class="loading">
            <!-- <Vue3Lottie :animation-data="loading_json" :height="200" :width="200" /> -->
            <div class="loading-spinner">
                <h1 class="text">Cargando {{ site }}...</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 40%;
    height: 100%;
    padding: 10px;
}

.lottie-animation-container {
    width: 50%;
    height: 50%;
}

.loading-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: red;
    justify-content: center;
    background-color: rgba(85, 85, 85, 0.5);
    z-index: 9999;
}

.text {
    margin-top: 20px;
}

.loading-spinner::before {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    border: 10px solid #eee;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.wrapper::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    backdrop-filter: blur(16px);
    z-index: -1;
}
</style>