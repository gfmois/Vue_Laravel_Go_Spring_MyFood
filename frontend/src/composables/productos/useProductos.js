import {ref} from "vue";
import ProductosService from "../../services/admin/ProductosService";
export const useGetProduct = (id_product) => {
    let product = ref()
    ProductosService.getProduct(id_product)
    .then(res => {
        product.value = res.data
    })
    .catch(error => {
        console.log(error);
    })
    return { product }
}
