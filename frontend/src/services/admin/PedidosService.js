import Api from "../Api";
import secret from "../../secret";

export default {
    getPedidos() {
        return Api(`${secret.ADMIN_SERVER}`).get('pedidos')
    }
}