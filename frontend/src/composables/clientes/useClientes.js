import { ref } from "vue";
import AdminClientesService from "../../services/admin/ClientesService.js";
import ClientService from "../../services/client/ClientService.js";

export const useGetClients = () => {
  const clients = ref([]);
  AdminClientesService
    .getClientes()
        .then((data) => (clients.value = data.data));

  return { clients };
};

export const useGetUserProfile = () => {
  const client = ref()
  ClientService.getProfile()
  .then(data => {
    client.value = data.data
  })
  .catch(error => client.value = false)

  return { client }

}
