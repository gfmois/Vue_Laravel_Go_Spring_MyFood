import Vuex from "vuex"

import { reservas } from "./modules/reservas"
import { productos } from "./modules/productos"
import { clientes } from "./modules/clientes"
import { carrito } from "./modules/carrito"

export default Vuex.createStore({
    modules: {
        reservas,
        productos,
        clientes,
        carrito
    }
})