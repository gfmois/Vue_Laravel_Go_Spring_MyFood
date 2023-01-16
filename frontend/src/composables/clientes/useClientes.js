import { ref } from "vue";
import AdminClientesService from "../../services/admin/ClientesService.js";
import ClientService from "../../services/client/ClientService.js";

export const useGetClientes = () => {
  const clients = ref([]);
  AdminClientesService
    .getClientes()
        .then((data) => (clients.value = data.data));

  return { clients };
};

export const useAddClientes = (client) => {
  const result = ref([])
  AdminClientesService
    .addCliente(client)
      .then(({ data }) => result.value = data)
      .catch((e) => result.value = false)
  
  return { result }
}

export const useUpdateClientes = (client) => {
  const result = ref([])
  AdminClientesService
    .updateCliente(client)
      .then(({ data }) => result.value = data)
      .catch((e) => result.value = false)
  
  return { result }
}

export const useDeleteClientes = (id_cliente) => {
  const result = ref([])
  AdminClientesService
    .deleteClient(id_cliente)
      .then(({ data }) => result.value = data)
      .catch((error) => {
        console.log(error);
        result.value = false
      })
  
  return { result }
}

export const useGetClientProperties = () => {
  const properties = ref([])
  AdminClientesService
    .getProperties()
      .then(({ data }) => properties.value = data)
      .catch((e) => properties.value = false)

  return { properties }
}
export const useGetUserProfile = () => {
  const client = ref()
  ClientService.getProfile()
  .then(data => {
    client.value = data.data
  })
  .catch(error => client.value = false)

  return { client }

}
