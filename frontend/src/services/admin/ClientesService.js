import Api from "../Api";
import secret from "../../secret";

export default {
    getClientes() {
        return Api(`${secret.ADMIN_SERVER}`).get('clients')
    },
    loginClient(credentials) {
        return Api(`${secret.CLIENT_SERVER}`).post("/auth/login", credentials);
    },
    loginAdmin(credentials) {
        return Api(`${secret.ADMIN_SERVER}`).post('/auth/login', credentials)
    },
    checkAdmin() {
        return Api(`${secret.ADMIN_SERVER}`).get('/auth/isAdmin');
    }

}