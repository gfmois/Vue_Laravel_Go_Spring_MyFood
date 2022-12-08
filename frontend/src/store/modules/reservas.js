import Constant from "../../Constant";
import ReservasService from "../../services/client/ReservasService";

export const reservas = {
    namespaced: true,
    state: {},
    mutations: {
        [Constant.GET_RESERVES]: (state, payload) => {
            state.reserves = payload
        }
    },
    actions: {
        [Constant.GET_RESERVES]: (store, _) => {
            ReservasService.getReserves()
                .then((res) => store.commit(
                    Constant.GET_RESERVES,
                    res.data.reservas
                ))
        }
    },
}