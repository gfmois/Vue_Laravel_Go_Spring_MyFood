import Constant from "../../Constant";
import AuthService from "../../services/admin/AuthService";
import { useCookies } from "vue3-cookies";
import router from "../../router";
const { cookies } = useCookies()

export const auth = {
    namespaces: true,
    state: {
        isAdmin: false,
        hasUser: false
    },
    mutations: {
        [Constant.CHECK_IS_ADMIN]: (state, payload) => {
            state.isAdmin = payload
        },
        [Constant.CHANGE_HAS_USER]: (state, payload) => {
            state.hasUser = payload
        }
    },
    actions: {
        [Constant.CHECK_IS_ADMIN]: (store, payload) => {
            if(cookies.get("token_user")) {
                AuthService.checkAdmin().then(res => {
                    if (res.data.status == "success") {
                        store.commit(Constant.CHECK_IS_ADMIN, true)
                    }
                })
                .catch(error => {
                    store.commit(Constant.CHECK_IS_ADMIN, false)
                    router.push("/auth")
                })
            } else {
                store.commit(Constant.CHECK_IS_ADMIN, false)
                router.push("/auth")
            }
        },
        [Constant.CHECK_HAS_USER]: (store, payload) => {
            cookies.get("token_client") ? store.commit(Constant.CHANGE_HAS_USER, true) : store.commit(Constant.CHANGE_HAS_USER, false)
        }, 
        [Constant.CHANGE_HAS_USER]: (store, payload) => {
            store.commit(Constant.CHANGE_HAS_USER, payload)
        }

    }
}