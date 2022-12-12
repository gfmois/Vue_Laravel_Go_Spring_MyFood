<script>
import { reactive } from "vue"
import { useStore } from "vuex"
import { UploadFile } from "../"
import { CustomInput, ItemsForm } from "../"
import { useGetCategoriesInput } from "../../composables/categorias/useCategorias"
import { useGetAllergensInput } from "../../composables/alergenos/useAlergenos"
import Constant_Admin from "../../Constant_Admin"
export default {
    setup() {
        const product = {
            nombre: "",
            precio: 0,
            imagen: "",
            upload_image: "",
            categorias: [],
            alergenos: []
        }
        const store = useStore()
        let category_input = reactive({
            name: "Categoria",
            children: [
                {
                    name: "Categoria",
                    tag: "select",
                    value: "",
                    children:useGetCategoriesInput().categories
                }
            ]
        })
        let allergens_input = reactive(useGetAllergensInput().allergens); 
        return { product, store,category_input, allergens_input }
    },
    components: { UploadFile, CustomInput, ItemsForm },
    data: () => ({
        name_input: {
            name: "Nombre",
            type: "text",
            required: true,
            value: ""
        },
        price_input: {
            name: "Precio",
            type: "number",
            required: true,
            value: ""
        }
    }),
    methods: {
        submitProduct() {
            let allergensOut = []
            let newProduct = new FormData()
            this.allergens_input.map(allergen => allergen.active ? allergensOut.push(allergen.value) : null)
            
            newProduct.append('nombre',this.name_input.value)
            newProduct.append('upload_image',this.product.upload_image)
            newProduct.append('alergenos', allergensOut)
            newProduct.append('precio',this.price_input.value)
            newProduct.append('categorias',[this.category_input.children[0].value])
            newProduct.append('imagen',this.product.upload_image.name)
            
            this.store.dispatch(Constant_Admin.ADD_PRODUCT, newProduct)
        }
    }
}
</script>
<template>
    <div class="add-product">
        <div class="product-image">
            <UploadFile @uploadImage="(product.upload_image = $event)" />
        </div>
        <div class="product-name">
            <CustomInput :step_collection="name_input" />
        </div>
        <div class="product-price">
            <CustomInput :step_collection="price_input" />
        </div>
        <div class="product-category">
            <CustomInput :step_collection="category_input" />
        </div>
        <div class="add-container">
            <div class="add-icon" @click="submitProduct()">
                <div class="card-info">
                    <h3>Crear Producto</h3>
                </div>
                <v-icon name="md-addcircle" scale="2" />
            </div>
        </div>
        <div class="product-tags">
            <h2>Alergenos</h2>
            <ItemsForm :items="allergens_input" />
        </div>

    </div>
</template>
<style scoped>
.add-product {
    width: 100%;
    height: 100%;
    padding: 5px;
    display: grid;
    position: relative;
    grid-template-columns: repeat(2, 1fr) repeat(2, 2fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    box-sizing: border-box;
}

.add-product div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.add-product>div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

.add-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.add-icon {
    width: fit-content !important;
    height: fit-content !important;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    border-radius: 20px;
    cursor: pointer;
    transition: transform .3s ease-out;
}

.add-icon * {
    fill: #888888;
}

.add-icon:hover * {
    fill: #00aae4;
}

.add-icon:hover {
    transform: translate(0, -5px);
}

.card-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.card-info h3 {
    color: #888888;
}

.product-image {
    grid-area: 1 / 1 / 3 / 3;
    box-sizing: border-box;
}

.product-image img {
    width: 50px;
    height: 50px;
}

.product-tags {
    grid-area: 3 / 1 / 4 / 5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
</style>