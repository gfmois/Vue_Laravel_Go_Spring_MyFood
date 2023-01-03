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
    }
}