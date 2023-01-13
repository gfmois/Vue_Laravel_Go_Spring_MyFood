import { ref } from "vue";
import pedidosService from "../../services/admin/PedidosService";
import OrderService from "../../services/client/OrderService.js";

export const useGetPedidos = () => {
  const pedidos = ref([]);
  pedidosService.getPedidos().then(({ data }) => {
    pedidos.value = data;
  });

  return { pedidos };
};

export const useAddOrders = (products) => {
  let response = ref();
  OrderService.addOrders(products)
    .then((res) => {
      res.status ? (response.value = true) : (response.value = false);
    })
    .catch((error) => {
      response.value = false;
    });
  return { response };
};
