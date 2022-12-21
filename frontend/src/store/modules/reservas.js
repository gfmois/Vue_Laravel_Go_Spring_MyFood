import Constant from "../../Constant";
import ReservasService from "../../services/client/ReservasService";

export const reservas = {
    namespaced: true,
    state: {},
    mutations: {
        [Constant.GET_RESERVES]: (state, payload) => {
            state.reserves = payload
        },
        [Constant.ADD_RESERVE]: (state, payload) => {
            state.reserves.push(payload)
        },
        [Constant.UPDATE_RESERVE]: (state, payload) => {
            let index = state.reserves.findIndex((e) => e.id_reserva == payload.id_reserva)
            state.reserves[index] = payload
        }
    },
    actions: {
        [Constant.GET_RESERVES]: (store, _) => {
            ReservasService.getReserves()
                .then(({ data }) => store.commit(
                    Constant.GET_RESERVES,
                    data
                ))
        },
        [Constant.ADD_RESERVE]: (store, payload) => {
            ReservasService.saveReservaAdmin(payload).then(({ data }) => {
                store.commit(Constant.ADD_RESERVE, data)
            }).catch(error=>{
                console.log(error)
            })
        },
        [Constant.UPDATE_RESERVE]: (store, payload) => {
            store.commit(Constant.UPDATE_RESERVE, payload)
        }
    },
}