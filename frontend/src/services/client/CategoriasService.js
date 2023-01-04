import Api from "../Api";
import secret from "../../secret";
import axios from "axios";

export default {
    getCategories(){
        return Api(`${secret.CLIENT_SERVER}`).get("categorias")
    }
}