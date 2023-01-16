import Api from "../Api"
import secret from "../../secret"

export default {
    getProfile() {
        return Api(`${secret.CLIENT_SERVER}`).get("client/profile")
    },
    updateProfile(profile) {
        return Api(`${secret.CLIENT_SERVER}`).put("client/profile", profile)
    }
}