import { ref } from "vue";
import productService from "../../services/admin/ProductosService"

export const useDeleteProduct = (id_product) => {
    const data = ref()
    productService.deleteProduct(id_product)
        .then((res) => data.value = res)

    return { data }
}