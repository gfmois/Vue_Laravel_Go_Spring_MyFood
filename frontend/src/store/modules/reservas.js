import Constant from "../../Constant";
import ReservasService from "../../services/client/ReservasService";

export const reservas = {
    namespaced: true,
    state: {
        holidaysList: []
    },
    mutations: {
        [Constant.GET_HOLIDAYS]: (state, payload) => {
            console.log("mutation: ", payload);
            state.holidaysList.push({ ...payload })
            console.log("mutation2", state.holidaysList[0]);
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