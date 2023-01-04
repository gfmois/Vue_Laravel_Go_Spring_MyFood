import Constant from "../../Constant";
import AdminProductosService from "../../services/admin/ProductosService";
import ProductosService from "../../services/client/ProductosService";

export const productos = {
    namespaces: true,
    state: {},
    mutations: {
        [Constant.GET_PRODUCTS]: (state, payload) => {
            state.productsListClient = payload.productos
        },
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
        [Constant.GET_PRODUCTS]: (store, payload) => {
            ProductosService.getProducts().then((res) => store.commit(Constant.GET_PRODUCTS, res.data))
        },
        [Constant.ADMIN_GET_PRODUCTS]: (store, payload) => {
            AdminProductosService.getProducts().then((res) => store.commit(Constant.ADMIN_GET_PRODUCTS, res.data))
        },
        [Constant.ADMIN_ADD_PRODUCT]: (store, payload) => {
            AdminProductosService.addProduct(payload).then(res =>{
                store.commit(Constant.ADMIN_ADD_PRODUCT,res.data)
            })
            .catch(error=>{
                console.log(error)
            })
        },
        [Constant.ADMIN_DELETE_PRODUCT]: (store, payload) => {
            AdminProductosService.deleteProduct(payload).then(res => {
                store.commit(Constant.ADMIN_DELETE_PRODUCT, payload)
            })
            .catch(error => {
                console.log(error);
            })
        },
        [Constant.ADMIN_UPDATE_PRODUCT]: (store, payload) => {
            AdminProductosService.updateProduct(payload).then(res => {
                store.commit(Constant.ADMIN_UPDATE_PRODUCT, res.data)
            })
            .catch(error => {
                console.log(error);
            })
        }

    }
}