import store from "../../store"
import AuthService from "../admin/AuthService";
import { useCookies } from "vue3-cookies";
import Constant from "../../Constant";
import { watch, computed } from "vue";
const { cookies } = useCookies()
export default {
    authIsAdmin(to, from, next) {
        store.dispatch(Constant.CHECK_IS_ADMIN)
        let isAdmin = computed(() => store.state.auth.isAdmin)
        isAdmin ? next() : next("/auth")
        
    },
    noAuth(to, from, next) {
        store.dispatch(Constant.CHECK_HAS_USER)
        let hasUser = computed(() => store.state.auth.hasUser)
        hasUser.value ? next("/home") : next()
    }

}