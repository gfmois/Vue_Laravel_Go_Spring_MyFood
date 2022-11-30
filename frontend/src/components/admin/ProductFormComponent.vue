<script>
import {UploadFile} from "../"
export default { 
    setup() {
        const product = {
            img: ""
        }
        const changeImg = (img) => {
            console.log(img);
        }
        return {product, changeImg}
    },
    components: { UploadFile },
}
</script>
<template>
    <div class="add-product">
        <div class="product-image">
            <UploadFile @uploadImage="product.img = $event" />
        </div>
        <div class="product-name">
            <h2>Nombre</h2>
            <input type="text" name="nombre">
        </div>
        <div class="product-price">
            <h2>Precio</h2>
            <input type="number" name="precio">
        </div>
        <div class="product-category">
            <h2>Categoria</h2>
            <select name="categoria">
                <option value="categoria">categoria</option>
            </select>
        </div>
        <div class="add-container">
            <div class="add-icon">
                <div class="card-info">
                    <h3>Crear Producto</h3>
                </div>
                <v-icon name="md-addcircle" scale="2" />
            </div>
        </div>
        <div class="product-tags">
            <h2>Alergenos</h2>
            <div>
                <div>
                    <v-icon name="gi-wheat" scale="2" />
                    <p>Gluten</p>
                </div>
                <div>
                    <v-icon name="gi-sad-crab" scale="2" />
                    <p>Crustáceos</p>
                </div>
                <div>
                    <v-icon name="gi-egg-clutch" scale="2" />
                    <p>Huevos</p>
                </div>
                <div>
                    <v-icon name="fa-fish" scale="2" />
                    <p>Pescado</p>
                </div>
                <div>
                    <v-icon name="gi-peanut" scale="2" />
                    <p>Cacahuetes</p>
                </div>
                <div>
                    <v-icon name="gi-milk-carton" scale="2" />
                    <p>Lácteos</p>
                </div>
                <div>
                    <v-icon name="gi-snail" scale="2" />
                    <p>Moluscos</p>
                </div>
            </div>
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
.product-name {

}
.product-tags {
    grid-area: 3 / 1 / 4 / 5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.product-tags > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.product-tags>div>div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    max-width: 100px;
    max-height: 100px;
}
.product-tags>div>div:hover {
    border: 1px solid black;
    box-sizing: border-box;
}
</style>