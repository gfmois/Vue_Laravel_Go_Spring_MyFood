import Api from "../Api";
import secret from "../../secret";
import axios from "axios";
import { useGetFilteredProducts } from "../../composables/productos/useProductos";

export default {
    getProducts(){
        return Api(`${secret.CLIENT_SERVER}`).get("productos")
    },
    getFilteredProducts(filters) {
        return Api(`${secret.CLIENT_SERVER}`).get("productos/filtro",{
            params:filters
        })
    },
    getProductDetails(slug_product) {
        return Api(`${secret.CLIENT_SERVER}`).get(`productos/${slug_product}`)
    },
    searchProducts(product) {
        return Api(`${secret.CLIENT_SERVER}`).get(`productos/search/${product}`)
    }

}