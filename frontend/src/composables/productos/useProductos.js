import {ref} from "vue";
import AdminProductosService from "../../services/admin/ProductosService";
import ProductosService from "../../services/client/ProductosService";
export const useGetProduct = (id_product) => {
    let product = ref()
    AdminProductosService.getProduct(id_product)
    .then(res => {
        product.value = res.data
    })
    .catch(error => {
        console.log(error);
    })
    return { product }
}

export const useGetFilteredProducts = (filters) => {
    let products = ref()
    ProductosService.getFilteredProducts(filters)
    .then(res => {
        res.data.productos.map(e => e["cantidad"] = 0)
        products.value = res.data
    })
    .catch(error => {
        console.log(error);
    })
    return { products }
}

export const useGetProductDetails = (slug_product) => {
    let product = ref()
    ProductosService.getProductDetails(slug_product)
    .then(res => {
        product.value = res.data.producto
    })
    .catch(error => {
        product.value = false
    })
    return { product }
}


export const useSearchProducts = (product) => {
    let products = ref()
    ProductosService.searchProducts(product)
    .then(res => products.value = res.data)
    .catch(error => products.value = false)
    return { products }
}