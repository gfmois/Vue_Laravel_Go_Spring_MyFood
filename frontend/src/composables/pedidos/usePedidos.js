import { ref } from "vue";
import pedidosService from "../../services/admin/PedidosService"

export const useGetPedidos = () => {
    const pedidos = ref([])
    pedidosService.getPedidos()
        .then(({ data }) => {
            pedidos.value = data
        })

    return { pedidos }
}