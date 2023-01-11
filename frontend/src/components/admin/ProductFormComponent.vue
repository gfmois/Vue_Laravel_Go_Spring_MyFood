<script>
import { computed, reactive, ref } from '@vue/reactivity';
import { useStore } from "vuex"
import { UploadFile } from "../"
import { CustomInput, ItemsForm } from "../"
import { useGetCategoriesInput } from "../../composables/categorias/useCategorias"
import { useGetAllergensInput } from "../../composables/alergenos/useAlergenos"
import { useGetProduct } from "../../composables/productos/useProductos"
import Constant from "../../Constant"
import { useRoute, useRouter } from "vue-router"
import { useToast } from "vue-toast-notification"
export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const toast = useToast()
        const product = reactive(route.params.id_producto
            ? useGetProduct(route.params.id_producto).product
            : { nombre: "", precio: 0, imagen: "", upload_image: "" })
        let category_input = reactive({
            name: "Categoria",
            children: [
                {
                    name: "Categoria",
                    tag: "select",
                    value: product.categorias ? product.categorias[0].id_categoria : "",
                    children: useGetCategoriesInput().categories
                }
            ]
        })
        let categories = reactive(useGetCategoriesInput().categories)
        let name_input = reactive({
            name: "Nombre",
            type: "text",
            required: true,
            value: product.nombre || ""
        })
        let price_input = reactive({
            name: "Precio",
            type: "number",
            required: true,
            value: product.precio || ""
        })
        let allergens_input = reactive(useGetAllergensInput().allergens);
        let urlImage = ref("")

        if (route.params.id_producto) {
            setTimeout(() => {        
                name_input.value = product.value.nombre
                price_input.value = product.value.precio
                category_input.children[0].value = product.value.categorias[0].nombre
                allergens_input.value.map((i_allergen) => {
                    product.value.alergenos.map((p_allergen)=>{
                        i_allergen.id_alergeno == p_allergen.id_alergeno ? i_allergen.active = true : null
                    })
                })
                urlImage.value = product.value.imagen
            },1000)
        }
        return { product, store, category_input, allergens_input, name_input, price_input, urlImage, route, categories, toast, router }
    },
    components: { UploadFile, CustomInput, ItemsForm },
    methods: {
        submitProduct() {
            let allergensOut = []
            let newProduct = new FormData()
            this.allergens_input.map(allergen => allergen.active ? allergensOut.push(allergen.value) : null)
            let categorias = []
            this.categories.map(category => category.nombre == this.category_input.children[0].value ? categorias.push(category.id_categoria) : null)

            newProduct.append('nombre',this.name_input.value)
            newProduct.append('upload_image',this.product.upload_image)
            newProduct.append('alergenos', allergensOut)
            newProduct.append('precio',this.price_input.value)
            newProduct.append('categorias',categorias)
            newProduct.append('imagen',this.product.upload_image.name)

            this.store.dispatch(Constant.ADMIN_ADD_PRODUCT, newProduct)

            setTimeout(()=> {
                this.toast.success("Producto Añadido",{
                    position: "top-right"
                })
                this.router.replace('/admin/productos/')
            }, 2000)
        },
        updateProduct() {
            let allergensOut = []
            let modProduct = new FormData()
            this.allergens_input.map(allergen => allergen.active ? allergensOut.push(allergen.value) : null)
            let categorias = []
            this.categories.map(category => category.nombre == this.category_input.children[0].value ? categorias.push(category.id_categoria) : null)

            modProduct.append('id_producto', this.product.id_producto)
            modProduct.append('nombre',this.name_input.value)
            modProduct.append('upload_image',this.product.upload_image)
            modProduct.append('alergenos', allergensOut)
            modProduct.append('precio',this.price_input.value)
            modProduct.append('categorias',categorias)
            modProduct.append('imagen',this.product.upload_image ? this.product.upload_image.name : this.product.imagen)
            
            this.store.dispatch(Constant.ADMIN_UPDATE_PRODUCT, modProduct)
            setTimeout(()=> {
                this.toast.success("Producto Modificado",{
                    position: "top-right"
                })
                this.router.replace('/admin/productos/')
            }, 1000)
        },
        deleteProduct() {
            this.store.dispatch(Constant.ADMIN_DELETE_PRODUCT, this.product.id_producto)
            setTimeout(()=> {
                this.toast.success("Producto Borrado",{
                    position: "top-right"
                })
                this.router.replace('/admin/productos/')
            }, 1000)

        },
        changeImage(e) {
            this.product.upload_image = e
        }

    }
}
</script>
<template>
    <div class="add-product">
        <div class="product-image">
            <UploadFile @uploadImage="changeImage($event)" :key="urlImage" :urlImage="urlImage"/>
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
        <div class="add-container" v-if="!$route.params.id_producto">
            <div class="add-icon" @click="submitProduct()">
                <div class="card-info">
                    <h3>Crear Producto</h3>
                </div>
                 <p>Icon</p><v-icon name="md-addcircle" scale="2" />
            </div>
        </div>
        <div class="add-container" v-if="$route.params.id_producto">
            <div class="add-icon" @click="updateProduct()">
                <div class="card-info">
                    <h3>Guardar</h3>
                </div>
                 <p>Icon</p><v-icon name="md-modeeditoutline" scale="2" />
            </div>
            <div class="add-icon" @click="deleteProduct()">
                <div class="card-info">
                    <h3>Borrar</h3>
                </div>
                 <p>Icon</p><v-icon name="hi-solid-trash" scale="2" />
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
    flex-direction: row !important;
    gap: 20px;
}

.add-icon {
    max-width: 70%;
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