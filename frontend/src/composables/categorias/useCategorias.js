import {ref} from "vue";
import AdminCategoriasService from "../../services/admin/CategoriasService";
import CategoriasService from "../../services/client/CategoriasService";

export const useGetCategories = () => {
    let categories = ref([])
    CategoriasService.getCategories()
    .then(res =>{
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })
    return {categories}
}

export const useGetCategoriesFilter = () => {
    let categories = ref([])
    CategoriasService.getCategories()
    .then(res =>{
        res.data.categories.map(c => categories.value.push({value: c.id_categoria, label: c.nombre}))
        
    })
    .catch(error => {
        console.log(error);
    })
    return {categories}
}

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
    .catch(error => {
        console.log(error);
    })
    return { categories }
}