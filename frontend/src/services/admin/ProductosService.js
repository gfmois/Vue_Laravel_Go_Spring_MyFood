import Api from "../Api";
import secret from "../../secret";
import axios from "axios";

export default {
    getProducts(){
        return Api(`${secret.ADMIN_SERVER}`).get("productos")
    },
    addProduct(newProduct){
        return Api(`${secret.ADMIN_SERVER}`).post("productos",newProduct, {headers:{
            "Content-Type": "multipart/form-data",
        }})
    },
    deleteProduct(id_product) {
        return Api(`${secret.ADMIN_SERVER}`).delete("", id_product)
    }
}