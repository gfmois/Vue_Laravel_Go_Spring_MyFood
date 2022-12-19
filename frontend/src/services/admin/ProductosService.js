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
    getProduct(id_product) {
        return Api(`${secret.ADMIN_SERVER}`).get("productos/"+id_product)
    },
    deleteProduct(id_product) {
        return Api(`${secret.ADMIN_SERVER}`).delete("productos/"+id_product)
    },
    updateProduct(modProduct) {
        return Api(`${secret.ADMIN_SERVER}`).post("productos/"+modProduct.get("id_producto"),modProduct, {headers:{
            "Content-Type": "multipart/form-data",
        }})
    }
}