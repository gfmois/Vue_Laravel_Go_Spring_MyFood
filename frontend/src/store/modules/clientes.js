import Constant from "../../Constant";
import ClientesService from "../../services/admin/ClientesService";

export const clientes = {
    namespaced: true,
    state: {
        authUser: {
            isAdmin: false
        }
    },
    mutations: {
        [Constant.LOGIN_CLIENT]: (state, payload) => {
            console.log(payload);
        }
    },
    actions: {
        [Constant.LOGIN_CLIENT]: (state, payload) => {
            ClientesService.login(payload).then(({ data }) => {
                console.log(data);
                store.commit(Constant.LOGIN_CLIENT, data);
            }).catch((e) => {
                console.log(e);
            })
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        isAuthAdmin(state) {
            try {
                //TODO Check if is admin or not
            } catch (e) {
                return false
            }
        },
        checkAdmin: (state) => {
            if (localStorage.token) {
                ClientesService.checkAdmin()
                    .then((user) => {
                        console.log(user);
                        user = user.data.user;
                        // localStorage.token = user.token
                        state.user = user;
                        state.authUser.isAdmin = true;
                        return true;
                    }).catch((e) => {
                        return false
                    })
            } 

            return false
        }
    }
}