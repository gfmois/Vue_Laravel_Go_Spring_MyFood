import Api from "../Api";
import secret from "../../secret";

export default {
    getAllergens(){
        return Api(`${secret.ADMIN_SERVER}`).get("alergenos")
    },
}