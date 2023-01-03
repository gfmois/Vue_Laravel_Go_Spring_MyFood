import Vuex from "vuex"

import { reservas } from "./modules/reservas"
import { productos } from "./modules/productos"
import { carrito } from "./modules/carrito"

export default Vuex.createStore({
    modules: {
        reservas,
        productos,
        carrito
    }
})