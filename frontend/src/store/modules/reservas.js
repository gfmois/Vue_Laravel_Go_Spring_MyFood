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
        }
    },
    actions: {
        [Constant.GET_RESERVES]: (store, _) => {
            ReservasService.getReserves()
                .then((res) => store.commit(
                    Constant.GET_RESERVES,
                    res.data.reservas
                ))
        },
        [Constant.ADD_RESERVE]: (store, payload) => {
            ReservasService.saveReservaAdmin(payload).then(({ data }) => {
                store.commit(Constant.ADD_RESERVE, data)
            }).catch(error=>{
                console.log(error)
            })
        }
    },
}