import Api from "../Api";
import secret from "../../secret";

export default {
    getProducts(){
        return Api(`${secret.ADMIN_SERVER}`).get("productos")
    },
    addProduct(newProduct){
        return Api(`${secret.ADMIN_SERVER}`).post("productos",newProduct)
    }
}