import Api from "../Api";
import secret from "../../secret";

export default {
    login(login_info) {
        return Api(`${secret.ADMIN_SERVER}`).post("auth/login", login_info)
    },
    checkAdmin() {
        return Api(`${secret.ADMIN_SERVER}`).get('/auth/isAdmin');
    }
}