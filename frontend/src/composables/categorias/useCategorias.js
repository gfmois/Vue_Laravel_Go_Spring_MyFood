import {ref} from "vue";
import AdminCategoriasService from "../../services/admin/CategoriasService";
import CategoriasService from "../../services/client/CategoriasService";

export const useGetCategories = () => {
    let categories = ref([])
    AdminCategoriasService.getCategories()
    .then(res =>{
        categories.value = res.data
    })
    .catch(error => {
        categories.value = false
    })
    return { categories }
}

export const useGetCategoriesFilter = () => {
    let categories = ref([])
    CategoriasService.getCategories()
    .then(res =>{
        res.data.categories.map(c => categories.value.push({value: c.id_categoria, label: c.nombre}))
        
    })
    .catch((error) => {
      console.log(error);
    });
  return { categories };
};

export const useGetCategoriesInput = () => {
    let categories = ref([])
    AdminCategoriasService.getCategories()
    .then(res => {
        categories.value = res.data
        categories.value.map(c => {
            c.name = c.nombre
            c.tag = "option"
            c.value = c.id_categoria
        })
    })
    .catch((error) => {
      console.log(error);
    });
  return { categories };
};

export const useGetCategoryProperties = () => {
  let properties = ref([]);
  AdminCategoriasService.getProperties().then(({ data }) => {
    properties.value = data;
  });

  return { properties };
};

export const useAddCategorias = (category) => {
  let result = ref([]);
  AdminCategoriasService.addCategory(category)
    .then((data) => {
      result.value = data.data;
    })
    .catch((err) => {
      result.value = false;
    });

  return { result };
};

export const useUpdateCategorias = (category) => {
  let result = ref([]);
  AdminCategoriasService.updateCategory(category)
    .then(({ data }) => {
      result.value = data;
    })
    .catch((e) => {
      result.value = false;
    });

  return { result };
};

export const useDeleteCategorias = (id_categpory) => {
  let result = ref([])
  AdminCategoriasService.deleteCategory(id_categpory)
    .then(({ data }) => result.value = data)
    .catch((e) => result.value = false)

  return { result }
}