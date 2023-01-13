<script>
import QrReaderComponentVue from '../../components/QrReaderComponent.vue';
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import ListTableComponent from "../../components/ListTableComponent.vue"
import { ReserveFormComponent } from "../../components/admin"
import Constant from '../../Constant';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const store = useStore()
        const route = useRoute()
        store.dispatch(`reservas/${Constant.GET_RESERVES}`)
        
        const isInForm = ref(computed(() => route.params.id || route.fullPath.includes('nueva_reserva')))
        const reserves = reactive(computed(() => store.state.reservas.reserves))
        const clicked = ref(false);
        const headOptions = ['Cliente', 'Fecha', 'Servicio', 'Nº Comensales', 'Estado'];

        return { reserves, clicked, headOptions, isInForm }
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
    <div class="add-reserve">
        <v-icon name="io-add-outline" scale="2" @click="$router.push('reservas/nueva_reserva')" />
    </div>
    <ListTableComponent v-if="!isInForm" :key="reserves" :route="'reservas'" :thead="headOptions" :tbody="reserves" />
    <div v-if="isInForm">
        <ReserveFormComponent />
    </div>
</div>
</template>
<style scoped>
.qr-reader {
    position: absolute;
    top: 20px;
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

.add-reserve {
    position: absolute;
    top: 10px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    width: 60px;
    height: 60px;
    left: 55%;
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