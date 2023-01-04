import store from "../../store"
import ClientesService from "../admin/ClientesService.js"

export default {
    authIsAdmin(to, from, next) {
        ClientesService.checkAdmin().then(({ data }) => {
            console.log(data, 2);
            localStorage.token = data.message.token;
            localStorage.setItem('user', JSON.stringify(data.message.user))
            next()
        }).catch((e) => {
            console.log(e);
            store.state.authUser.isAdmin = false
            console.log('Error');
            next("/")
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