import Constant from "../../Constant";
import ReservasService from "../../services/client/ReservasService";

export const reservas = {
    namespaced: true,
    state: {},
    mutations: {
        [Constant.GET_HOLIDAYS]: (state, payload) => {
            state.holidaysList = payload
        }
    },
    actions: {
        [Constant.GET_HOLIDAYS]: (store) => {
            ReservasService.getHolidays().then((res) => store.commit(Constant.GET_HOLIDAYS, res.data))
        }
    },
    getters: {
        getHolidays(state) {
            return state.holidaysList
        }
    }
}