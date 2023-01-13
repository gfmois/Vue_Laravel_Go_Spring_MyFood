import Vuex from "vuex"

import { reservas } from "./modules/reservas"
import { productos } from "./modules/productos"
import { auth } from "./modules/auth"
import { carrito } from "./modules/carrito"

export default Vuex.createStore({
    modules: {
        auth,
        reservas,
        productos,
        carrito
    }
})