import Api from "../Api";
import secret from "../../secret";

export default {
    getCategories(){
        return Api(`${secret.ADMIN_SERVER}`).get("categorias")
    },
}