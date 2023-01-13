import { ref } from "vue";
import ClientesService from "../../services/admin/ClientesService";

export const useGetClientes = () => {
  const clients = ref([]);
  ClientesService
    .getClientes()
        .then((data) => (clients.value = data.data));

  return { clients };
};

export const useAddClientes = (client) => {
  const result = ref([])
  ClientesService
    .addCliente(client)
      .then(({ data }) => result.value = data)
      .catch((e) => result.value = false)
  
  return { result }
}

export const useUpdateClientes = (client) => {
  const result = ref([])
  ClientesService
    .updateCliente(client)
      .then(({ data }) => result.value = data)
      .catch((e) => result.value = false)
  
  return { result }
}

export const useDeleteClientes = (client) => {
  const result = ref([])
  ClientesService
    .deleteClient(client)
      .then(({ data }) => result.value = data)
      .catch((e) => {
        console.log(e);
        result.value = false
      })
  
  return { result }
}

export const useGetClientProperties = () => {
  const properties = ref([])
  ClientesService
    .getProperties()
      .then(({ data }) => properties.value = data)
      .catch((e) => properties.value = false)

  return { properties }
}