<script>
import { RouterView } from 'vue-router'
import CustomModal from "../../components/CustomModal.vue"
import { ref, reactive, watch } from 'vue'
import { useGetCategories } from '../../composables/categorias/useCategorias'
import { useGetAllergens, useGetAllergensProperties } from '../../composables/alergenos/useAlergenos'

export default {
    components: {
        CustomModal
    },
    setup() {
        const showModalCategories = ref(false)
        const showModalAllergens = ref(false)

        const categories = reactive(useGetCategories().categories)
        const allergens = reactive({ 
            from_db: useGetAllergens().allergens, 
            properties: useGetAllergensProperties().properties,
            data: [], 
        })

        watch(
            () => allergens.from_db,
            (v, pv) => {
                allergens.from_db.map((e) => {
                    let icn = e.imagen.split("|")

                    e.icono = icn[0]
                    e.color = icn[1]
                    e.slug = e.nombre.replaceAll(" ", "_").toLowerCase()
                    delete e.imagen

                    allergens.data.push(e)
                })
            }
        )


        return { showModalCategories, showModalAllergens, categories, allergens }
    }
}
</script>
<!-- <v-icon name="gi-wheat" scale="2"/> Gluten
<v-icon name="gi-sad-crab" scale="2"/> Crustáceos
<v-icon name="gi-egg-clutch" scale="2"/> Huevos
<v-icon name="fa-fish" scale="2"/> Pescado
<v-icon name="gi-peanut" scale="2"/> Cacahuetes
<v-icon name="gi-milk-carton" scale="2"/> Lácteos
<v-icon name="gi-snail" scale="2"/> Moluscos -->
<template>
    <div class="main-products">
        <div class="statistics">
            <div class="statistic-card" @click="$router.replace('/admin/productos/')">
                <div class="card-info">
                    <h1>20</h1>
                    <h3>Productos</h3>
                </div>
                <v-icon name="bi-box2-fill" scale="3" />
            </div>
            <div class="statistic-card" @click="showModalCategories = true">
                <div class="card-info">
                    <h1>{{ categories.length }}</h1>
                    <h3>Categorias</h3>
                </div>
                <v-icon name="md-category" scale="3" />
            </div>
            <div class="statistic-card" @click="showModalAllergens = true">
                <div class="card-info">
                    <h1>{{ allergens.data.length }}</h1>
                    <h3>Productos alergenos</h3>
                </div>
                <v-icon name="md-block" scale="3" />
            </div>
            <div class="statistic-card" @click="$router.replace('/admin/productos/nuevo_producto')"> 
                <div class="card-info">
                    <h3>Crear Producto</h3>
                </div>
                <v-icon name="md-addcircle" scale="3" />
            </div>
        </div>
        <CustomModal :key="showModalCategories" :where="'Categorias'" :data="categories" @close="showModalCategories = $event" :show="showModalCategories" />
        <CustomModal :key="showModalAllergens" :properties="allergens.properties" :where="'Alergenos'" :data="allergens.data" @close="showModalAllergens = $event" :show="showModalAllergens" />
        <!-- <RouterView/> -->
        <!-- FIXME: Add loading spinner -->
    </div>
</template>
<style scoped>
.main-products {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.statistics {
    box-sizing: border-box;
    height: 25%;
    display: flex;
    justify-content: space-between;
}

.statistic-card {
    box-sizing: border-box;
    width: 20%;
    height: 70%;
    display: flex;
    padding: 30px;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    border-radius: 20px;
    cursor: pointer;
    transition: transform .3s ease-out;
}

.statistic-card:hover {
    transform: translate(0, -5px);
}

.statistic-card:hover *{
    fill: #00aae4;
}

.statistic-card * {
    fill: #888888;
}

.card-info {
    display: flex;
    flex-direction: column;
}

.card-info h1 {
    color: #00aae4;
    font-weight: 700;
    font-size: 2.5rem;
}

.card-info h3 {
    color: #888888;
}

</style>