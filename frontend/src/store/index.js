import Vuex from "vuex"

import { reservas } from "./modules/reservas"
import { productos } from "./modules/productos"

export default Vuex.createStore({
    modules: {
        reservas,
        productos
    }
})