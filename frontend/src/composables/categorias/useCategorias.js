import {ref} from "vue";
import CategoriasService from "../../services/admin/CategoriasService";

export const useGetCategories = () => {
    let categories = ref([])
    CategoriasService.getCategories()
    .then(res =>{
        categories.value = res.data
    })
    .catch(error => {
        console.log(error);
    })
    return {categories}
}

export const useGetCategoriesInput = () => {
    let categories = ref([])
    CategoriasService.getCategories()
    .then(res => {
        categories.value = res.data
        categories.value.map(c => {
            c.name = c.nombre
            c.tag = "option"
            c.value = c.id_categoria
        })
    })
    .catch(error => {
        console.log(error);
    })
    return { categories }
}

export const useGetCategoryProperties = () => {
    let properties = ref([])
    CategoriasService.getProperties()
        .then(({ data }) => {
            properties.value = data
        })

    return { properties }
}

export const useAddCategorias = (category) => {
    let result = ref([])
    CategoriasService.addCategory(category)
        .then((data) => {
            result.value = data.data
        })
        .catch((err) => {
            result.value = false
        })

    return { result }
}