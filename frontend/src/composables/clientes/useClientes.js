import { ref } from "vue";
import ClientesService from "../../services/admin/ClientesService";

export const useGetClients = () => {
  const clients = ref([]);
  ClientesService
    .getClientes()
        .then((data) => (clients.value = data.data));

  return { clients };
};
