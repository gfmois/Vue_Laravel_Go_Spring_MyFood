import Api from "../Api";
import secret from "../../secret";

export default {
    getClientes() {
        return Api(`${secret.ADMIN_SERVER}`).get('clients')
    }
}