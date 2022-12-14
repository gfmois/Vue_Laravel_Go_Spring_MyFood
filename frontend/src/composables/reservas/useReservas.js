import { ref } from "vue"
import reservaService from "../../services/client/ReservasService"

export const useGetHolidays = (params) => {
    const holidays = ref([])
    reservaService.getHolidays(params)
        .then((data) => holidays.value = data.data);

    return { holidays }
}

export const useCreateReserve = (reserva) => {
    const reservaID = ref("");
    reservaService.saveReserva(reserva)
        .then((data) => reservaID.value = data.data);
        
    return { reservaID }
}

// FIXME: Reserva Service make petition from client server, change it to admin server
export const useGetReserves = () => {
    const reserves = ref([])
    reservaService.getReserves()
        .then((data) => reserves.value = data.data)

    return { reserves }
}