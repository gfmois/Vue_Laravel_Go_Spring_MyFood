import Vuex from "vuex"

import { reservas } from "./modules/reservas"
import { productos } from "./modules/productos"
import { clientes } from "./modules/clientes"

export default Vuex.createStore({
    modules: {
        reservas,
        productos,
        clientes
    }
})