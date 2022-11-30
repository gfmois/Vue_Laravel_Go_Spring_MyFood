import Vuex from "vuex"

import { reservas } from "./modules/reservas"

export default Vuex.createStore({
    modules: {
        reservas
    }
})