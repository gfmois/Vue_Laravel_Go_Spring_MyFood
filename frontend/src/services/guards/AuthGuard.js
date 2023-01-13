import store from "../../store"
import ClientesService from "../admin/ClientesService.js"

export default {
    authIsAdmin(to, from, next) {
        ClientesService.checkAdmin().then(({ data }) => {
            localStorage.token = data.message.token;
            localStorage.setItem('user', JSON.stringify(data.message.user))
            next()
        }).catch((e) => {
            store.clientes.authUser.isAdmin = false
            next("/auth")
        })
    },
    noAuth(to, from, next) {
        console.log(!store.getters["user/isAuthWorker"]);

        if (!store.getters["user/isAuthWorker"]) {
            next()
        } else {
            next("/")
        }
    }
}