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
            <div class="statistic-card">
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
            <div class="statistic-card">
                <div class="card-info">
                    <h3>Crear Producto</h3>
                </div>
                <v-icon name="md-addcircle" scale="3" />
            </div>
        </div>
        <div class="products-list">
            <div class="product-item" v-for="index in 20">
                <div class="product-image">
                    <img src="/src/assets/IMG/plato_1.jpg">
                </div>
                <div class="product-info">
                    <div>
                        <p>Nombre</p>
                        <h3>Salmon al pilpil</h3>
                    </div>
                    <div>
                        <p>Precio</p>
                        <h3>20€</h3>
                    </div>
                    <div>
                        <p>Categoria</p>
                        <h3>Pescados</h3>
                    </div>
                    <div class="tags">
                        <!-- <v-icon name="gi-wheat" scale="2" />  -->
                        <!-- <v-icon name="gi-sad-crab" scale="2" /> -->
                        <!-- <v-icon name="gi-egg-clutch" scale="2" /> -->
                        <v-icon name="fa-fish" scale="2" /> 
                        <!-- <v-icon name="gi-peanut" scale="2" />
                        <v-icon name="gi-milk-carton" scale="2" />
                        <v-icon name="gi-snail" scale="2" />  -->
                    </div>
                </div>
            </div>
        </div>
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

.products-list {
    box-sizing: border-box;
    height: 75%;
    width: 100%;
    overflow: auto;
    display: grid;
    padding: 5px;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 10px;
}

.products-list::-webkit-scrollbar {
    display: none;
}

.product-item {
    max-width: 900px;
    box-sizing: border-box;
    height: 200px;
    display: flex;
    padding: 5px;
    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

.product-image {
    box-sizing: border-box;
    height: 100%;
    width: 50%;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.product-info {
    box-sizing: border-box;
    width: 50%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
}

.product-info div {
    width: 100%;
    height: 20%;
}

.product-info div:first-child {
    grid-area: 1 / 1 / 2 / 3;
}

.product-info p {
    color: #888888;
    font-size: 1.1rem;
}

.product-info h3 {
    color: black;
    font-weight: 700;
    font-size: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.product-info .tags {
    border-top: 2px solid #888888;
    width: 100%;
    grid-area: 3 / 1 / 4 / 3;
    display: flex;
    gap: 5px;
}
</style>