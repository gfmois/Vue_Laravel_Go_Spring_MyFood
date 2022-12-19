import Constant from "../../Constant";
import ProductosService from "../../services/admin/ProductosService";

export const productos = {
    namespaces: true,
    state: {},
    mutations: {
        [Constant.ADMIN_GET_PRODUCTS]: (state, payload) => {
            state.productsList = payload
        },
        [Constant.ADMIN_ADD_PRODUCT]: (state, payload) => {
            payload.c_categorias = [payload.categorias[0].nombre]
            state.productsList.push(payload)
        },
        [Constant.ADMIN_DELETE_PRODUCT]: (state, payload) => {
            let index = state.productsList.findIndex((product) => product.id_producto === payload);
            state.productsList.splice(index,1)
        },
        [Constant.ADMIN_UPDATE_PRODUCT]: (state, payload) => {
            payload.c_categorias = [payload.categorias[0].nombre]
            let index = state.productsList.findIndex((product) => product.id_producto === payload.id_producto )
            state.productsList[index] = payload
        }
    },
    actions: {
        [Constant.ADMIN_GET_PRODUCTS]: (store, payload) => {
            ProductosService.getProducts().then((res) => store.commit(Constant.ADMIN_GET_PRODUCTS, res.data))
        },
        [Constant.ADMIN_ADD_PRODUCT]: (store, payload) => {
            ProductosService.addProduct(payload).then(res =>{
                store.commit(Constant.ADMIN_ADD_PRODUCT,res.data)
            })
            .catch(error=>{
                console.log(error)
            })
        },
        [Constant.ADMIN_DELETE_PRODUCT]: (store, payload) => {
            ProductosService.deleteProduct(payload).then(res => {
                store.commit(Constant.ADMIN_DELETE_PRODUCT, payload)
            })
            .catch(error => {
                console.log(error);
            })
        },
        [Constant.ADMIN_UPDATE_PRODUCT]: (store, payload) => {
            ProductosService.updateProduct(payload).then(res => {
                store.commit(Constant.ADMIN_UPDATE_PRODUCT, res.data)
            })
            .catch(error => {
                console.log(error);
            })
        }

    }
}