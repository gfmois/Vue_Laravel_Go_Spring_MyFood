import {ref} from "vue";
import AlergenosService from "../../services/admin/AlergenosService";
export const useGetAllergens = () => {
    let allergens = ref([])
    AlergenosService.getAllergens()
    .then(res => {
        allergens.value = res.data
    })
    .catch(error => {
        console.log(error);
    })
    return { allergens }
}

export const useGetAllergensInput = () => {
    let allergens = ref([])
    AlergenosService.getAllergens()
    .then(res => {
        allergens.value = res.data
        allergens.value.map(a => {
            a.name = a.nombre,
            a.active = false,
            a.icon = a.icono.split("|")[0],
            a.color = a.icono.split("|")[1],
            a.value = a.id_alergeno
        })
    })
    .catch(error => {
        console.log(error);
    })
    return { allergens}
}

export const useGetAllergensProperties = () => {
    let properties = ref([])
    AlergenosService.getProperties()
        .then(({ data }) => {
            properties.value = data
        })

    return { properties }
}

export const useAddAlergenos = (allergen) => {
    let result = ref([])
    AlergenosService.addAllergen(allergen)
        .then(({ data }) => {
            result.value = data
        })
        .catch((data) => {
            result.value = false
        })

    return { result }
}

export const useUpdateAlergenos = (allergen) => {
    let result = ref([])
    AlergenosService.updateAllergen(allergen)
        .then(({ data }) => {
            result.value = data
        })
        .catch(( data ) => {
            result.value = false
        })

    return { result }
}

export const useDeleteAlergenos = (id_alergeno) => {
    let result = ref([])
    AlergenosService.deleteAllergen(id_alergeno)
        .then(({ data }) => result.value = data)
        .catch((e) => result.value = false)

    return { result }
}