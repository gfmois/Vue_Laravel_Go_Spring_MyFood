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
    },
    addCliente(cliente) {
        return Api(`${secret.ADMIN_SERVER}`).post("/clients", cliente);
    },
    deleteClient(cliente) {
        return Api(`${secret.ADMIN_SERVER}`).delete("/clients", cliente)
    },
    updateCliente(cliente) {
        return Api(`${secret.ADMIN_SERVER}`).put("/clients", cliente);
    },
    getProperties() {
        return Api(`${secret.ADMIN_SERVER}`).get("/clients/properties")
    }

}