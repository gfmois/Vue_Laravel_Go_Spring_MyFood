import Api from "../Api";
import secret from "../../secret";
import axios from "axios";

export default {
    addOrders(products){
        return Api(`${secret.CLIENT_SERVER}`).post("pedidos",products)
    }
}