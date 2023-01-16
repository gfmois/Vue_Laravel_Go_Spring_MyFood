import Api from "../Api";
import secret from "../../secret";

export default {
    addOrders(products){
        return Api(`${secret.CLIENT_SERVER}`).post("pedidos", products)
    },
    getOrders() {
        return Api(`${secret.CLIENT_SERVER}`).get("pedidos")
    }
}