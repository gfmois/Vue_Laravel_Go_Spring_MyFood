import { ref } from "vue";
import AuthService from "../../services/client/AuthService";
import AdminAuthService from "../../services/admin/AuthService";
import { useCookies } from "vue3-cookies";
import store from "../../store";
import Constant from "../../Constant";
const { cookies } = useCookies()

export const useAuthLogin = (login_info) => {
    const user = ref();
    AuthService.login(login_info)
    .then(res => {
        user.value = res.data 
        cookies.set("token_client",res.data.token)
        store.dispatch(Constant.CHANGE_HAS_USER, true)
        if (res.data) {
            AdminAuthService.login({email:login_info.email,password:login_info.contraseña})
            .then(res => {
                if (res.data.status == "success") {
                    cookies.set("token_user",res.data.authorization.token)
                    store.dispatch(Constant.CHECK_IS_ADMIN)
                }
            })
        }
    })
    .catch(error => {
        user.value = false
        console.log(error);
    })
    
    return { user }
}

export const useAuthRegister = (register_info) => {
    const user = ref();
    AuthService.register(register_info)
    .then(res => {
        user.value = res.data
        cookies.set("token_client",res.data.token)
        store.dispatch(Constant.CHANGE_HAS_USER, true)
    })
    .catch(error => {
        user.value = false
        console.log(error);
    })
    return { user }
}