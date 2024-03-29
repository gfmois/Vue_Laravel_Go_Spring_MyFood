import { ref } from "vue";
import reservaService from "../../services/client/ReservasService";

export const useGetHolidays = (params) => {
  const holidays = ref([]);
  reservaService
    .getHolidays(params)
    .then((data) => (holidays.value = data.data));

  return { holidays };
};

export const useCreateReserve = (reserva) => {
  const reservaID = ref("");
  reservaService
    .saveReserva(reserva)
    .then((data) => (reservaID.value = data.data));

  return { reservaID };
};

export const useCreateReserveAdmin = (reserva) => {
  const reservaID = ref("");
  reservaService
    .saveReservaAdmin(reserva)
    .then(({ data }) => (reservaID.value = data));

  return { reservaID };
};

export const useUpdateReserveAdmin = (reserva) => {
  const reservaID = ref();
  reservaService
    .updateReserveAdmin(reserva)
    .then(({ data }) => (reservaID.value = data));

  return { reservaID };
};

export const useGetReserve = (id_reserva) => {
  const reserve = ref();
  reservaService
    .getReserve(id_reserva)
    .then(({ data }) => (reserve.value = data));

  return { reserve };
};

export const useGetReserves = () => {
  const reserves = ref([]);
  reservaService.getReserves().then((data) => (reserves.value = data.data));

  return { reserves };
};

export const useGetClientReserves = () => {
  const reserves = ref([])
  reservaService.getClientReserves()
    .then(({ data }) => reserves.value = data)
    .catch((e) => reserves.value = false)

  return { reserves }
}
