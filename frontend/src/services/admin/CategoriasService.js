import Api from "../Api";
import secret from "../../secret";

export default {
    getCategories(){
        return Api(`${secret.ADMIN_SERVER}`).get("categorias")
    },
    getProperties() {
        return Api(`${secret.ADMIN_SERVER}`).get("categorias/properties")
    },
    addCategory(category) {
        return Api(`${secret.ADMIN_SERVER}`).post("categorias", category)
    }
}