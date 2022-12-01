<script>
import { RouterView } from 'vue-router'
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
            <div class="statistic-card">
                <div class="card-info">
                    <h1>5</h1>
                    <h3>Categorias</h3>
                </div>
                <v-icon name="md-category" scale="3" />
            </div>
            <div class="statistic-card">
                <div class="card-info">
                    <h1>4</h1>
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