<script>
import secret from '../../secret';
import { ref, reactive, watch } from 'vue';
import store from '../../store';
import Constant from '../../Constant';
export default {
    props:{
        products: Array,
        isCart: false
    },
    setup(props, context) {
        const products = props.products
        const o_products = []
        const addOne = (product) => {
            product.cantidad++
            store.dispatch(Constant.UPDATE_CART,product)
        }
        const lessOne = (product) => {
            product.cantidad == 0 ? null : product.cantidad--
            store.dispatch(Constant.UPDATE_CART,product)
        }
        const submit = ()=>{
            products.map((e) => e.cantidad > 0 ? o_products.push(e) : null)
            console.log(o_products);
        }
        return { secret, addOne, lessOne, submit, products, o_products }
    }

}
</script>
<template>
<div class="products-list" v-if="!isCart">
    <div class="product-item" v-for="product in products" :key="product.id_product">
        <div class="product-image">
            <img :src="`${secret.ADMIN_SERVER}/public/${product.imagen}`">
        </div>
        <div class="product-info" :class="{active: product.cantidad>0}">
            <h3>{{ product.nombre }}</h3>
            <h3 class="price">{{ product.precio }}€</h3>
            <div class="product-details">
                <v-icon name="io-remove-circle" scale="2" fill="orange" @click="lessOne(product)"></v-icon>
                <p>{{ product.cantidad }}</p>
                <v-icon name="io-add-circle-sharp" scale="2" fill="orange" @click="addOne(product)"></v-icon>
            </div>
        </div>

    </div>
</div>
<div v-if="isCart" class="products-cart-list">
    <p class="no-cart-products" v-if="!products.length > 0">No tienes productos todavia</p>
    <div class="product-cart-item" v-for="product in products" v-show="product.cantidad > 0">
        <div class="product-cart-image">
            <img :src="`${secret.ADMIN_SERVER}/public/${product.imagen}`">
        </div>
        <div class="product-cart-info">
            <div class="description">
                <h3>{{product.nombre}}</h3>
                <p>{{product.precio}}€</p>
            </div>
            <div class="amount">
                <v-icon name="io-remove-circle" scale="2" fill="orange" @click="lessOne(product)"></v-icon>
                <p>{{ product.cantidad }}</p>
                <v-icon name="io-add-circle-sharp" scale="2" fill="orange" @click="addOne(product)"></v-icon>
            </div>
        </div>
        <div class="product-cart-total">
            <p>{{product.cantidad * product.precio}}€</p>
        </div>

    </div>
</div>
</template>

<style scoped>
.products-list {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
}

.product-item {
    max-width: 900px;
    box-sizing: border-box;
    height: 300px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
.active {
    height: 100px !important;
}
.product-item:hover .product-info{
    height: 100px;
    transition: height 0.3s ease-in-out;
}
.product-info {
    transition: height 0.3s ease-in-out;
    padding: 5px;
    position: relative;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: space-between;
    align-items: flex-end;
    background-color: antiquewhite;
}
.product-info h3 {
    max-width: 90%;
    height: 45px;
}
.product-details {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.product-details p {
    font-size: 2rem;
}

.product-image {
    height: 250px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    object-position: center;
}

.products-cart-list::-webkit-scrollbar {
    display: none;
}
.products-cart-list {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    overflow-y: scroll;
}

.product-cart-item {
    box-sizing: border-box;
    height: 100px;
    width: 100%;
    display: flex;
    gap: 10px;
}

.product-cart-image {
    width: 20%;
    height: 100px;
}

.product-cart-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.product-cart-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 65%;
    font-weight: 900;
}
.product-cart-info .description {
    font-size: 1.2rem;
    color: black;
}

.product-cart-info .amount {
    display: flex;
    width: 20%;
    font-size: 1.5rem;
    justify-content: space-evenly;
    align-items: center;
    color: black;
}

.product-cart-total {
    width: 15%;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: orange;
    font-weight: 900;
}
.no-cart-products {
    color: black;
    font-size: 1.3rem;
    font-weight: 900;
}
</style>