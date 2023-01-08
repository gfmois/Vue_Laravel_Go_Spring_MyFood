import {ref} from "vue";
import OrderService from "../../services/client/OrderService.js";
export const useAddOrders = (products) => {
    let response = ref()
    OrderService.addOrders(products)
    .then(res => {
        res.status ? response.value = true : response.value = false
    })
    .catch(error => {
        response.value = false
    })
    return { response }

}