<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGetProductDetails } from '../../composables/productos/useProductos';
import secret from '../../secret';
const route = useRoute()
const id_producto = route.params.id_producto
const product = ref(useGetProductDetails(id_producto).product)

</script>
<template>
    <div class="main-product-details">
        <div class="product-image">
            <img :src="`${secret.ADMIN_SERVER}/public/${product.imagen}`">
        </div>
        <div class="product-info">
            <div class="name">
                <p>Nombre</p>
                <h2>{{product.nombre}}</h2>
            </div>
            <div class="price">
                <p>Precio</p>
                <h2>{{product.precio}}</h2>
            </div>
            <div class="categories">
                <p>Categorias</p>
                <h2>{{product.categorias.length}}</h2>
            </div>
            <div class="allergens">
                <p>Alergenos</p>
                <h2>{{product.alergenos.length}}</h2>
            </div>
        </div>
    </div>
</template>
<style scoped>
.main-product-details {
    box-sizing: border-box;
    width: 100vw;
    height: 84vh;
    display: flex;
    font-size: 1.2rem;
}
.main-product-details * {
    box-sizing: border-box;
}
.product-image {
    
    width: 50%;
    height: 100%;
    padding: 20px;
    
}
.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.product-info {
    width: 50%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
}
.product-info > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}



@media(max-width: 1200px) {
    .main-product-details {
        flex-direction: column;
        padding: 0;
        gap: 30px;
        font-size: 1.5rem;
    }
    .main-product-details > div {
        padding: 0;
        width: 100%;
    }

    .product-image {
        max-height: 40vh;
    }
    .product-info {
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }

}
</style>
