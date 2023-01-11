import Api from "../Api";
import secret from "../../secret";

export default {
    login(login_info) {
        return Api(`${secret.CLIENT_SERVER}`).post("auth/login", login_info)
    },
    register(register_info) {
        return Api(`${secret.CLIENT_SERVER}`).post("auth/register", register_info)
    }
}