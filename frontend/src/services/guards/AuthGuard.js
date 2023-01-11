import store from "../../store"
import AuthService from "../admin/AuthService";
import { useCookies } from "vue3-cookies";
import Constant from "../../Constant";
const { cookies } = useCookies()
export default {
    authIsAdmin(to, from, next) {
        
        store.dispatch(Constant.CHECK_IS_ADMIN)
        store.state.auth.isAdmin ? next() : next("/auth")
        if (store.state.auth.isAdmin) {
            let check_token = setInterval(()=>{
                if (store.state.auth.isAdmin) {
                    store.dispatch(Constant.CHECK_IS_ADMIN)
                } else {
                    clearInterval(check_token)
                }
            }, 1000 * 10)
        }
        
    },
    noAuth(to, from, next) {
        console.log(!store.getters["user/isAuthWorker"]);

        if (!store.getters["user/isAuthWorker"]) {
            next()
        } else {
            next("/")
        }
    }

}