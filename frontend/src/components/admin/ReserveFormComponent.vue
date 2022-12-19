<script>
import CustomInputVue from '../CustomInput.vue';
import DatePicker from "../DatePicker.vue"
import { ref, computed, reactive } from "vue"
import { useRoute } from "vue-router"
import { useGetClients } from "../../composables/clientes/useClientes"
import { useGetReserve } from "../../composables/reservas/useReservas";
import json from "../../assets/loading_calendar.json"
import { Vue3Lottie } from 'vue3-lottie';
import { useCreateReserveAdmin } from '../../composables/reservas/useReservas';
import { useToast } from "vue-toast-notification"

export default {
    setup() {
        const route = useRoute();
        const $toastr = useToast();

        const isDetails = ref(false);
        const reserve = ref();
        const loading = ref(true)
        const res = ref(null)
        const dateCalendar = ref()
        const clients = reactive(useGetClients().clients)
        const selectedClient = ref()

        const comensales = ref()
        const servicio = ref()
        const params = computed(() => {
            loading.value = true
            return {
                comensales: comensales.value,
                servicio: servicio.value
            }
        })

        const submitReserve = () => {
            let r_date = `${dateCalendar.value.getFullYear()}-${dateCalendar.value.getMonth()}-${dateCalendar.value.getDate()}`;
            let data = ({
                n_comensales: params.value.comensales,
                tipo: params.value.servicio,
                id_cliente: selectedClient.value.id_cliente,
                fecha: r_date,
                estado: "PENDIENTE"
            });

            res.value = reactive(useCreateReserveAdmin(data).reservaID)

            if (res.value != null) {
                $toastr.success("Reserva Creada Correctamente", {
                    position: "top-right"
                })
            }
            
        }

        selectedClient.value = { id_cliente: "", telefono: "", nombre: "Cliente", email: ""}

        if (route.params.id) {
            isDetails.value = true
            reserve.value = reactive(useGetReserve(route.params.id).reserve);
        }

        return { params, comensales, servicio, loading, json, clients, selectedClient, submitProduct: submitReserve, dateCalendar, res, reserve, isDetails }
    },
    components: {
        CustomInputVue,
        DatePicker,
        Vue3Lottie
    }
}
</script>

<template>
    <div class="wrapper">
        {{ reserve }}
        <div class="card w-lf-top">
            <div class="title">Información del Cliente</div>
            <div class="input-wrapper">
                <v-select class="lf-top" placeholder="Cliente" v-model="selectedClient" label="nombre"
                    :options="clients"></v-select>
                <input class="lf-bt" v-model="selectedClient.telefono" placeholder="Teléfono" disabled>
                <input class="rg-top" v-model="selectedClient.id_cliente" placeholder="ID" disabled>
                <input class="rg-bt" v-model="selectedClient.email" placeholder="Email" disabled>
            </div>
        </div>

        <div class="card w-lf-bt">
            <div class="title">Información de la Reserva</div>
            <div class="input-wrapper">
                <v-select class="lf-top" placeholder="Servicio" v-model="servicio"
                    :options="['Almuerzo', 'Comida', 'Cena']"></v-select>
                <input class="rg-top" type="number" min="1" max="50" v-model="comensales" placeholder="Comensales">
                <input class="rg-bt" type="text" placeholder="Estado"> <!-- Change it for select -->
                {{ params }}
            </div>
        </div>

        <div class="card w-rg-top">
            <DatePicker v-model="dateCalendar" @loading="loading = $event" v-show="!loading" :key="params" :params="params" />
            <Vue3Lottie :animation-data="json" :height="350" :width="600" v-show="loading" />
        </div>

        <div class="w-rg-bt">
            <div class="add-container">
                <div class="add-icon" @click="submitProduct()">
                    <div class="card-info">
                        <h3 v-if="!isDetails">Crear Reserva</h3>
                        <h3 v-if="isDetails">Actualizar</h3>
                    </div>
                    <v-icon name="md-addcircle" scale="2" />
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.lottie-animation-container {
    width: 100%;
}
.wrapper {
    justify-items: center;
    align-items: center;
    width: 70vw;
    height: 80vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    box-sizing: border-box;
}

.add-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.add-icon {
    width: fit-content !important;
    height: fit-content !important;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    border-radius: 20px;
    cursor: pointer;
    transition: transform .3s ease-out;
}

.add-icon * {
    fill: #888888;
}

.add-icon:hover * {
    fill: #00aae4;
}

.add-icon:hover {
    transform: translate(0, -5px);
}

.w-lf-top {
    grid-area: 1 / 1 / 3 / 3;
}

.w-lf-bt {
    grid-area: 3 / 1 / 5 / 3;
}

.w-rg-top {
    grid-area: 1 / 3 / 3 / 5;
    height: 95% !important;
}

.w-rg-bt {
    grid-area: 3 / 3 / 5 / 5;
}

.card {
    width: 30vw;
    height: 25vh;
    border-radius: 22px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.card .title {
    font-weight: bolder;
}

.card .input-wrapper {
    align-items: center;
    height: 70%;
    padding: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.input-wrapper * {
    margin: 10px;
}

input {
    background-color: transparent;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-radius: 4px;
    padding: 0 0 0 4px;
    white-space: normal;
    display: flex;
    appearance: none;
    box-sizing: border-box;
    height: 3.7vh;
    color: black;
}

input:disabled {
    cursor: not-allowed;
}

input::placeholder {
    color: black;
}

.lf-top {
    grid-area: 1 / 1 / 2 / 2;
}

.lf-bt {
    grid-area: 2 / 1 / 3 / 2;
}

.rg-top {
    grid-area: 1 / 2 / 2 / 3;
}

.rg-bt {
    grid-area: 2 / 2 / 3 / 3;
}
</style>