import Constant from "../../Constant";

export const carrito = {
    namespaces: true,
    state: {
        cart: []
    },
    mutations: {
        [Constant.GET_CART]: (state, payload) => {
            state.cart = "Adios"
        },
        [Constant.UPDATE_CART]: (state, payload) => {
            let index = state.cart.findIndex((product)=> product.id_producto === payload.id_producto)
            if (index == -1 && payload.cantidad > 0) {
                state.cart.push(payload)
            } else if (index >= 0) {
                if (payload.cantidad == 0) {
                    state.cart.splice(index,1)
                } else {
                    state.cart[index] = payload
                }
            }
        }
    },
    actions: {
        [Constant.GET_CART]: (store, payload) => {
            store.commit(Constant.GET_PRODUCTS)
        },
        [Constant.UPDATE_CART]: (store, payload) => {
            store.commit(Constant.UPDATE_CART, payload)
        }

    }
}