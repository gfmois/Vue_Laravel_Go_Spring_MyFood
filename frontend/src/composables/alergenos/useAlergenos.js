import {ref} from "vue";
import AlergenosService from "../../services/admin/AlergenosService";
export const useGetAllergens = () => {
    let allergens = ref([])
    AlergenosService.getAllergens()
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })
    return { allergens}
}

export const useGetAllergensInput = () => {
    let allergens = ref([])
    AlergenosService.getAllergens()
    .then(res => {
        allergens.value = res.data
        allergens.value.map(a => {
            a.name = a.nombre,
            a.active = false,
            a.icon = a.imagen.split("|")[0],
            a.color = a.imagen.split("|")[1],
            a.value = a.id_alergeno
        })
    })
    .catch(error => {
        console.log(error);
    })
    return { allergens}
}