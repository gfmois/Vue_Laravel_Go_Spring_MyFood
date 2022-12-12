import Constant_Admin from "../../Constant_Admin";
import ProductosService from "../../services/admin/ProductosService";

export const productos = {
    namespaces: true,
    state: {},
    mutations: {
        [Constant_Admin.GET_PRODUCTS]: (state, payload) => {
            state.productsList = payload
        },
        [Constant_Admin.ADD_PRODUCT]: (state, payload) => {
            payload.c_categorias = payload.categorias
            state.productsList.push(payload)
        }
    },
    actions: {
        [Constant_Admin.GET_PRODUCTS]: (store, payload) => {
            ProductosService.getProducts().then((res) => store.commit(Constant_Admin.GET_PRODUCTS, res.data))
        },
        [Constant_Admin.ADD_PRODUCT]: (store, payload) => {
            ProductosService.addProduct(payload).then(res =>{
                store.commit(Constant_Admin.ADD_PRODUCT,res.data)
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
}