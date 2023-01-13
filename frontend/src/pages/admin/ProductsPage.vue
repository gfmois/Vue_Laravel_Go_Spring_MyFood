<script>
import { RouterView } from 'vue-router'
import CustomModal from "../../components/CustomModal.vue"
import { ref, reactive, watch } from 'vue'
import { useGetCategories, useGetCategoryProperties } from '../../composables/categorias/useCategorias'
import { useGetAllergens, useGetAllergensProperties } from '../../composables/alergenos/useAlergenos'

export default {
    components: {
        CustomModal
    },
    setup() {
        const showModalCategories = ref(false)
        const showModalAllergens = ref(false)

        const uItem = ref({})
        const dItem = ref({})

        const categories = reactive({ from_db: useGetCategories().categories, properties: useGetCategoryProperties().properties })
        const allergens = reactive({
            from_db: useGetAllergens().allergens,
            properties: useGetAllergensProperties().properties,
        })

        const DATA_TYPE_KEYS = {
            varchar: "text",
            int: "number"
        }

        watch(
            () => uItem.value,
            (v, _) => {
                if (Object.keys(v).findIndex(e => e.includes("alergeno")) != -1) {
                    allergens.from_db[allergens.from_db.findIndex(e => e.id_alergeno == v.id_alergeno)] = Object.keys(v).map((e) => {
                        if (e == "icono") {
                            let icon = String(v[e]).split("|")
                            v.icono = icon[0]
                            v.color = icon[1]
                        }

                        return v
                    }).slice(-1)[0]
                }

                if (Object.keys(v).findIndex(e => e.includes("categoria")) != -1) {
                    categories.from_db[categories.from_db.findIndex(e => e.id_categoria == v.id_categoria)] = Object.keys(v).map((e) => {
                        if (e == "icono") {
                            let icon = String(v[e]).split("|")
                            v.icono = icon[0]
                            v.color = icon[1]
                        }

                        return v
                    }).slice(-1)[0];
                }
            }
        )

        watch(
            () => dItem.value,
            (v, _) => {
                if (Object.keys(v).findIndex(e => e.includes("alergeno")) != -1) {
                    allergens.from_db
                        .splice(allergens.from_db
                            .findIndex(e => e.id_alergeno == v.id_alergeno), 1)
                }

                if (Object.keys(v).findIndex(e => e.includes("categoria")) != -1) {
                    categories.from_db
                        .splice(categories.from_db
                            .findIndex(e => e.id_categoria == v.id_categoria), 1)
                }
            }
        )

        watch(
            () => allergens.properties,
            (v, _) => {
                v.map((p) => {
                    p.DATA_TYPE = DATA_TYPE_KEYS[p.DATA_TYPE];
                })

                allergens.properties = v
            }
        )

        watch(
            () => categories.properties,
            (v, _) => {
                v.map((p) => {
                    p.DATA_TYPE = DATA_TYPE_KEYS[p.DATA_TYPE];
                })

                categories.properties = v
            }
        )

        return { showModalCategories, showModalAllergens, categories, allergens, uItem, dItem }
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
                    <h1>{{ categories.from_db.length }}</h1>
                    <h3>Categorias</h3>
                </div>
                <v-icon name="md-category" scale="3" />
            </div>
            <div class="statistic-card" @click="showModalAllergens = true">
                <div class="card-info">
                    <h1>{{ allergens.from_db.length }}</h1>
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
        <CustomModal v-if="showModalCategories" @updatedItem="uItem = $event" :key="showModalCategories"
            :properties="categories.properties" @deletedItem="dItem = $event" :where="'Categorias'"
            :data="categories.from_db" @close="showModalCategories = $event" :show="showModalCategories" />
        <CustomModal v-if="showModalAllergens" @updatedItem="uItem = $event" :key="showModalAllergens"
            :properties="allergens.properties" @deletedItem="dItem = $event" :where="'Alergenos'"
            :data="allergens.from_db" @close="showModalAllergens = $event" :show="showModalAllergens" />
        <RouterView/>
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

.statistic-card:hover * {
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