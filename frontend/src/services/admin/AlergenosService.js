import Api from "../Api";
import secret from "../../secret";

export default {
    getAllergens(){
        return Api(`${secret.ADMIN_SERVER}`).get("alergenos")
    },
    getProperties() {
        return Api(`${secret.ADMIN_SERVER}`).get("alergenos/properties")
    },
    addAllergen(allergen) {
        return Api(`${secret.ADMIN_SERVER}`).post("alergenos", allergen)
    }
}