<script setup>
import { useStore } from 'vuex';
import Constant from '../../Constant';
import { computed,reactive,watch, ref } from 'vue';
import { ProductsList, Filters } from '../../components/client'
import { useGetCategories, useGetCategoriesFilter } from '../../composables/categorias/useCategorias';
import { useGetFilteredProducts } from '../../composables/productos/useProductos'
const store = useStore()
store.dispatch(Constant.GET_PRODUCTS)
const store_products = computed(()=>store.state.productos.productsListClient)
const products = ref([])
const noFindFilters = ref(false)
const cart = reactive(computed(()=>store.state.carrito.cart))

watch(store_products, () => {
    noFindFilters.value = false
    store_products.value.map(sp => {
        products.value.push(sp)
    })
    products.value.map(p =>{
        p.cantidad ? null : p["cantidad"] = 0
        cart.value.map(c => {
            p.id_producto == c.id_producto ? p.cantidad = c.cantidad : null
        })
    })
})

const filters = reactive([
    {
        db_name: "categorias",
        name: "Categorias",
        type: "Multiselect",
        searchable: "true",
        options: useGetCategoriesFilter().categories,
        value: []
    },
    {
        db_name: "orden",
        name: "Ordenar",
        type: "Radiobuttons",
        options: [
            { name:" Mayor a menor precio", value:"DESC"},
            { name:" Menor a mayor precio", value:"ASC"}
        ],
        value: ""

    },
    {
        db_name: "rango",
        name: "Rango de precios",
        type: "Slider",
        max: 30,
        format:{suffix: '€'},
        value: [0,30]
    }
])
watch(filters, () => {
    let submitFilters = {}
    filters.map(f => submitFilters[f.db_name] = f.value.toString())
    applyFilters(submitFilters);
})

const applyFilters = (newFilters) => {
    
    let newProducts = useGetFilteredProducts(newFilters).products
    watch(newProducts,() => {
        if (newProducts.value.length > 0) {
            noFindFilters.value = false
            products.value.splice(0)
            newProducts.value.map(p => {
                cart.value.map(c => {
                    c.id_producto == p.id_producto ? p.cantidad = c.cantidad : null
                })
                products.value.push(p)
            })
        } else {
            
            (newFilters.categorias == "" && newFilters.orden == "" && newFilters.rango=="0,30") ? noFindFilters.value = false : noFindFilters.value = true 
            
            products.value.splice(0)
            store_products.value.map(sp => {
              products.value.push(sp)
            })
            products.value.map(p =>{
            p.cantidad ? null : p["cantidad"] = 0
            cart.value.map(c => {
                p.id_producto == c.id_producto ? p.cantidad = c.cantidad : null
            })
    })
            
        }

    })
}

const deleteFilters = () => {
    filters.map(f => {
        (typeof f.value == "string") ? f.value = "" : f.value = []
        f.db_name == "rango" ? f.value = [0,30] : null 
    })
}
</script>
<template>
    <div class="main-order">
        <div class="filters">
            <v-icon class="delete-filters" name="hi-solid-trash" scale="1.2" fill="orange" @click="deleteFilters()"/>
            <Filters :key="filters" :filters="filters"></Filters>
        </div>
        <div class="products">         
            <p v-if="noFindFilters" class="no-find-filters">No se encuantran productos con esos filtros</p>  
            <ProductsList :key="products" :products="products"></ProductsList>
        </div>
        <div class="cart">
            <div class="header">
                 <v-icon name="fa-shopping-cart" scale="2" fill="orange"></v-icon>
            </div>
            <div class="body content">
                <ProductsList :key="products" :products="cart" :isCart="true"></ProductsList>
            </div>
            <div class="footer content">
                <button @click="$router.push('/carrito')">Ir al Carrito</button>
            </div>
        </div>
        
    </div>
</template>
<style scoped>
    .main-order {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        padding-top: 20px;
    }
    .filters {
        position: relative;
        width: 20%;
    }
    .filters .delete-filters {
        position: absolute;
        right: 10px;
        cursor: pointer;
        z-index: 2;
    }
    .products {
        width: 80%;
    }
    .cart {
        all: unset;
        box-sizing: border-box;
        background-color: white;
        padding: 10px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        bottom: 20px;
        right: 20px;
        z-index: 2;
        position: fixed;
        display: flex;
        cursor: pointer;
        transition: all .5s ease-in-out;
        flex-direction: column;
        align-items: flex-start;
        overflow: hidden;
        font-weight: 900;
        color: orange;
    }
    
    .cart .header {
        display: flex;
        align-items: center;
        width: 100%;
    }
    .cart .body {
        box-sizing: border-box;
        padding-top: 10px;
        height: 80%;
        width: 100%;
    }
    .cart .footer {
        box-sizing: border-box;
        height: 10%;
        width: 100%;
        display: flex;
    }
    .cart .footer button {
        all: unset;
        float: right;
        background-color: orange;
        color: white;
        padding: 10px;
        border-radius: 20px;
    }
    .cart:hover {
        transition: all .5s ease-in-out;
        padding: 20px;
        width: 40vw;
        height: 40vh;
    }
    .cart .content {
        display: none;
    }
    .cart:hover .content{
        display: block;
    }

    .no-find-filters{
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
        font-size: 2rem;
        font-weight: 700;

    }
</style>