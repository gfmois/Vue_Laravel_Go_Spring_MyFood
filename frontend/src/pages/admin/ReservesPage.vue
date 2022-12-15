<script>
import QrReaderComponentVue from '../../components/QrReaderComponent.vue';
import { ref, reactive } from 'vue';
import { useGetReserves } from '../../composables/reservas/useReservas';
import ListTableComponent from "../../components/ListTableComponent.vue"
import { ReserveFormComponent } from "../../components/admin"

export default {
    setup() {
        const reserves = reactive(useGetReserves().reserves)
        const clicked = ref(false);
        const headOptions = ['Cliente', 'Fecha', 'Servicio', 'Nº Comensales', 'Estado'];

        return { reserves, clicked, headOptions }
    },
    components: {
        QrReaderComponentVue,
        ListTableComponent,
        ReserveFormComponent
    },
}
</script>
<template>
<div class="main">
    <div class="qr-reader">
        <v-icon name="bi-qr-code-scan" scale="2" @click="clicked = true" />
        <QrReaderComponentVue @open_close="clicked = $event" v-if="clicked" />
    </div>
    <ListTableComponent v-if="!$route.params.id" :key="reserves" :route="'reservas'" :thead="headOptions" :tbody="reserves" />
    <div v-if="$route.params.id">
        <ReserveFormComponent />
    </div>
</div>
</template>
<style scoped>
.qr-reader {
    position: absolute;
    top: 10px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    width: 60px;
    height: 60px;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    max-height: 80vh;
    overflow: hidden;
    overflow-y: scroll;
    width: 100%;
    border-radius: 10px;
}

</style>