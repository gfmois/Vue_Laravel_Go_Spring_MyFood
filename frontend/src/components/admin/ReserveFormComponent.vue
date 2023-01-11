<script>
import CustomInputVue from "../CustomInput.vue";
import DatePicker from "../DatePicker.vue";
import { ref, computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import retry from "retry";
import { useGetClients } from "../../composables/clientes/useClientes";
import {
  useGetReserve,
  useCreateReserveAdmin,
  useGetHolidays,
  useUpdateReserveAdmin,
} from "../../composables/reservas/useReservas";
import json from "../../assets/json/loading_calendar.json";
import loadingJson from "../../assets/json/loading-blob.json";
import { Vue3Lottie } from "vue3-lottie";
import { useToast } from "vue-toast-notification";
import ModalComponent from "../ModalComponent.vue";
import { useStore } from "vuex";
import Constant from "../../Constant";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const $toastr = useToast({
      position: "top-right",
    });
    const operation = retry.operation({
      retries: 5,
      factor: 3,
      minTimeout: 1 * 1000,
      maxTimeout: 60 * 1000,
      randomize: true,
    });

    const isDetails = ref(route.params.id);
    const showModal = ref(false);
    const loading_datepicker = ref(true);
    const global_loading = ref(true);
    const dateCalendar = ref();
    const res = reactive({ value: undefined });
    const data = ref("");
    const clients = reactive(useGetClients().clients);
    const selectedClient = ref();

    const estado = ref();
    const comensales = ref();
    const servicio = ref();
    const params = computed(() => {
      loading_datepicker.value = true;
      return {
        comensales: comensales.value,
        servicio: servicio.value,
      };
    });

    const submitReserve = () => {
      if (params.value.comensales > 50) {
        $toastr.warning("Máximo de comensales permitido 50");
        return;
      }

      data.value = {
        n_comensales: params.value.comensales,
        tipo: params.value.servicio,
        id_cliente: selectedClient.value.id_cliente,
        estado: estado.value,
      };

      if (dateCalendar.value.constructor.name == "Date") {
        data.value.fecha = `${dateCalendar.value.getFullYear()}-${
          dateCalendar.value.getMonth() + 1
        }-${dateCalendar.value.getDate()}`;
      }

      if (!isDetails.value) {
        store
          .dispatch(`reservas/${Constant.ADD_RESERVE}`, data.value)
          .then((data) => {
            res.value = data;
          });
      } else {
        res.value = reactive(
          useUpdateReserveAdmin({ id_reserva: isDetails.value, ...data.value })
            .reservaID
        );
        store.dispatch(`reservas/${Constant.UPDATE_RESERVE}`, {
          id_reserva: isDetails.value,
          ...data.value,
        });
      }
    };

    watch(res, ({ value }, prevValue) => {
      if (
        value == 0 &&
        typeof prevValue.value != "undefined" &&
        prevValue.value != ""
      ) {
        isDetails.value
          ? $toastr.warning("Cambie algún valor para actualizar")
          : $toastr.warning("Asegurese de que has completado todos los campos");
      }

      if (value == 1 && typeof prevValue.value != "undefined") {
        $toastr.success(
          `Reserva ${isDetails.value ? "Actualizada" : "Creada"} Correctamente`
        );
      }
    });

    selectedClient.value = {
      id_cliente: "",
      telefono: "",
      nombre: "Cliente",
      email: "",
    };

    if (isDetails.value) {
      operation.attempt(async (currentAttempt) => {
        try {
          const reserve = reactive(useGetReserve(route.params.id).reserve);
          setTimeout(() => {
            comensales.value = reserve.value.n_comensales;
            servicio.value = reserve.value.tipo;
            selectedClient.value = {
              id_cliente: reserve.value.client.id_cliente,
              telefono: reserve.value.client.telefono,
              nombre: reserve.value.client.nombre,
              email: reserve.value.client.email,
            };
            dateCalendar.value = new Date(reserve.value.fecha);
            estado.value = reserve.value.estado;
            global_loading.value = false;
          }, 2500);
        } catch (e) {
          if (operation.retry(e)) {
            return;
          }
        }
      });
    } else {
      global_loading.value = false;
    }

    return {
      params,
      comensales,
      servicio,
      loading_datepicker,
      json,
      clients,
      selectedClient,
      submitReserve,
      dateCalendar,
      isDetails,
      estado,
      loadingJson,
      global_loading,
      res,
      data,
      showModal,
    };
  },
  components: {
    CustomInputVue,
    DatePicker,
    Vue3Lottie,
    ModalComponent,
  },
};
</script>

<template>
  <div class="loader" v-if="global_loading">
    <Vue3Lottie :animation-data="loadingJson" :height="350" :width="600" />
  </div>
  <div class="wrapper">
    <div class="card w-lf-top">
      <div class="title">Información del Cliente</div>
      <div class="input-wrapper">
        <v-select
          class="lf-top"
          v-if="!isDetails"
          placeholder="Cliente"
          v-model="selectedClient"
          label="nombre"
          :options="clients"
        ></v-select>
        <input
          class="lf-top"
          v-if="isDetails"
          v-model="selectedClient.nombre"
          placeholder="Nombre"
          disabled
        />
        <input
          class="lf-bt"
          v-model="selectedClient.telefono"
          placeholder="Teléfono"
          disabled
        />
        <input
          class="rg-top"
          v-model="selectedClient.id_cliente"
          placeholder="ID"
          disabled
        />
        <input
          class="rg-bt"
          v-model="selectedClient.email"
          placeholder="Email"
          disabled
        />
      </div>
    </div>

    <div class="card w-lf-bt">
      <div class="title">Información de la Reserva</div>
      <div class="input-wrapper">
        <v-select
          class="lf-top"
          placeholder="Servicio"
          v-model="servicio"
          :options="['Almuerzo', 'Comida', 'Cena']"
        ></v-select>
        <input
          class="rg-top"
          type="number"
          min="1"
          max="50"
          v-model="comensales"
          placeholder="Comensales"
        />
        <v-select
          class="rg-bt"
          placeholder="Estado"
          v-model="estado"
          :options="['DENEGADA', 'CONFIRMADA']"
        ></v-select>
      </div>
    </div>

    <div class="card w-rg-top">
      <DatePicker
        v-model="dateCalendar"
        @loading="loading_datepicker = $event"
        v-show="!loading_datepicker"
        :key="params"
        :params="params"
      />
      <Vue3Lottie
        :animation-data="json"
        :height="350"
        :width="600"
        v-show="loading_datepicker"
      />
    </div>

    <div class="w-rg-bt">
      <div class="add-container">
        <div class="add-icon" @click="submitReserve()">
          <div class="card-info">
            <h3 v-if="!isDetails">Crear Reserva</h3>
            <h3 v-if="isDetails">Actualizar</h3>
          </div>
          <p>Icon</p><v-icon name="md-modeeditoutline" scale="2" v-if="isDetails" />
          <p>Icon</p><v-icon name="md-addcircle" scale="2" v-if="!isDetails" />
        </div>
        <div class="add-icon" @click="showModal = true">
          <div class="card-info">
            <h3>Cancelar</h3>
          </div>
          <p>Icon</p><v-icon name="md-block" scale="2" />
        </div>
      </div>
    </div>

    <ModalComponent
      @close="showModal = false"
      :show="showModal"
      :route="'/admin/reservas'"
      :header="'¿Volver a Reservas?'"
      :body="'Si aceptas serás redireccionado a reservas, donde verás todas las reservas existentes hasta el momento.'"
    />
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

.loader > * {
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
  transition: transform 0.3s ease-out;
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
