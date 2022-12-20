<script>
import CustomInputVue from '../CustomInput.vue';
import DatePicker from "../DatePicker.vue"
import { ref, computed, reactive, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { useGetClients } from "../../composables/clientes/useClientes"
import { useGetReserve, useUpdateReserveAdmin, useCreateReserveAdmin } from "../../composables/reservas/useReservas";
import json from "../../assets/loading_calendar.json"
import loadingJson from "../../assets/loading-blob.json"
import { Vue3Lottie } from 'vue3-lottie';
import { useToast } from "vue-toast-notification"

export default {
    setup() {
        const route = useRoute();
        const $toastr = useToast();

        const isDetails = ref(route.params.id);
        const loading_datepicker = ref(true)
        const global_loading = ref(true)
        const dateCalendar = ref()
        const res = ref("asdf")
        const clients = reactive(useGetClients().clients)
        const selectedClient = ref()

        const estado = ref()
        const comensales = ref()
        const servicio = ref()
        const params = computed(() => {
            loading_datepicker.value = true
            return {
                comensales: comensales.value,
                servicio: servicio.value
            }
        })

        const data = ref()

        const submitReserve = () => {
            data.value = ({
                n_comensales: params.value.comensales,
                tipo: params.value.servicio,
                id_cliente: selectedClient.value.id_cliente,
                estado: estado.value
            });

            if (dateCalendar.value.constructor.name == "Date") {
                data.fecha = `${dateCalendar.value.getFullYear()}-${dateCalendar.value.getMonth()}-${dateCalendar.value.getDate()}`;
            }

            !isDetails
                ? res.value = reactive(useCreateReserveAdmin(data.value).reservaID)
                : res.value = reactive(useUpdateReserveAdmin({ id_reserva: isDetails.value, ...data.value }).reservaID)

        }

        selectedClient.value = { id_cliente: "", telefono: "", nombre: "Cliente", email: "" }

        if (isDetails) {
            const reserve = reactive(useGetReserve(route.params.id).reserve);
            setTimeout(() => {
                comensales.value = reserve.value.n_comensales
                servicio.value = reserve.value.tipo
                selectedClient.value = {
                    id_cliente: reserve.value.client.id_cliente,
                    telefono: reserve.value.client.telefono,
                    nombre: reserve.value.client.nombre,
                    email: reserve.value.client.email
                }
                dateCalendar.value = reserve.value.fecha
                estado.value = reserve.value.estado
                global_loading.value = false
            }, 2500)
        }

        return { params, comensales, servicio, loading_datepicker, json, clients, selectedClient, submitProduct: submitReserve, dateCalendar, isDetails, estado, loadingJson, global_loading, res, data }
    },
    watch: {
        res(data) {
            if (data.value.value == 1) {
                $toastr.success(isDetails ? "Reserva Actualizada Correctamente" : "Reserva Creada Correctamente", {
                    position: "top-right"
                })
            }

            if (data.value.value == 0) {
                $toastr.error(isDetails ? "Hubo un error al actualizar la reserva" : "Hubo un error al crear la reserva", {
                    position: "top-right"
                })
            }
        }
    },
    components: {
        CustomInputVue,
        DatePicker,
        Vue3Lottie
    }
}
</script>

<template>
    <div class="loader" v-if="global_loading">
        <Vue3Lottie :animation-data="loadingJson" :height="350" :width="600" />
    </div>
    <div class="wrapper">
        {{ res }}
        {{ data }}
        <div class="card w-lf-top">
            <div class="title">Información del Cliente</div>
            <div class="input-wrapper">
                <v-select class="lf-top" v-if="!isDetails" placeholder="Cliente" v-model="selectedClient" label="nombre"
                    :options="clients"></v-select>
                <input class="lf-top" v-if="isDetails" v-model="selectedClient.nombre" placeholder="Nombre" disabled>
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
                <v-select class="rg-bt" placeholder="Estado" v-model="estado"
                    :options="['DENEGADA', 'CONFIRMADA']"></v-select>
            </div>
        </div>

        <div class="card w-rg-top">
            <DatePicker v-model="dateCalendar" @loading="loading_datepicker = $event" v-show="!loading_datepicker"
                :key="params" :params="params" />
            <Vue3Lottie :animation-data="json" :height="350" :width="600" v-show="loading_datepicker" />
        </div>

        <div class="w-rg-bt">
            <div class="add-container">
                <div class="add-icon" @click="submitProduct()">
                    <div class="card-info">
                        <h3 v-if="!isDetails">Crear Reserva</h3>
                        <h3 v-if="isDetails">Actualizar</h3>
                    </div>
                    <v-icon name="md-modeeditoutline" scale="2" v-if="isDetails" />
                    <v-icon name="md-addcircle" scale="2" v-if="!isDetails" />
                </div>
                <div class="add-icon">
                    <div class="card-info">
                        <h3>Cancelar</h3>
                    </div>
                    <v-icon name="md-block" scale="2" />
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.lottie-animation-container {
    width: 100%;
}

.loader {
    z-index: 2;
    background-color: transparent;
    backdrop-filter: blur(10px);
    position: absolute;
    width: 70vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader>* {
    transform: scale(1.5);
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