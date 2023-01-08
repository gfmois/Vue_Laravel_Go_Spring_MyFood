<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import { ProductsList, Payment } from '../../components/client';
import { CustomInput } from '../../components';
import { useAddOrders } from '../../composables/pedidos/usePedidos';
const store = useStore()
const cartProducts = reactive(computed(() => store.state.carrito.cart))
const totalPrice = ref(0)
const toast = useToast()
const stepPosition = ref(0)
cartProducts.value.map(p => {
    totalPrice.value += p.cantidad * p.precio
})
const stepButtons = {
    previus : ["","Modificar Pedido","Modificar Metodo de Pago"],
    next : ["Confirmar Pedido","Seleccionar Metodo de Pago","Realizar Pedido"]
}

watch(cartProducts.value, () =>{
    totalPrice.value = 0
    cartProducts.value.map(p => {
        totalPrice.value += Math.round(p.cantidad * p.precio)
    })
})

const paymentMethod = reactive({
    value: "",
    name: {
        name: "Nombre",
        type: "text",
        required: true,
        value: ""
    },
    card_number: {
        name: "Numero Tarjeta",
        type: "text",
        required: true,
        value: ""
    },
    expiration: {
        name: "Expiracion(mm/yy)",
        type: "text",
        required: true,
        value:""
    },
    security_code: {
        name: "Codigo Seguridad",
        type: "text",
        required: true,
        value: ""
    }
})

const address = reactive({
    name: "Dirección",
    type: "text",
    required: true,
    value: ""
})
const previusStep = () =>{
    let condition = false
    let msg = "Algo ha ido mal"
    switch (stepPosition.value) {
        case 1: 
            condition = true
            break;
        case 2:
            condition = true
            break;
    }
    stepPosition.value > 0 && condition ? stepPosition.value-- : toast.error(msg);
}

const nextStep = () =>{
    let condition = false
    let msg = "Algo ha ido mal"
    switch (stepPosition.value) {
        case 0:
            totalPrice.value > 0 ? condition = true : msg = "Añade productos al carrito para realizar el pedido"
            break;
        case 1:
            paymentMethod.value ? condition = true : msg = "Añade un metodo de pago"
            if (condition && paymentMethod.value == "targeta") {
                for (let cardInfo in paymentMethod) {
                    paymentMethod[cardInfo].value == "" ? (condition = false, msg="Todos los campos tiene que estar rellenos") : null
                }
            }
            break;
        case 2:
            address.value ? (condition = true, submitOrder()) : msg = "Indica una dirección de envío"
            break;
    }
    stepPosition.value < 2 && condition ? stepPosition.value++ : (condition ? null : toast.error(msg));
}

const submitOrder = () => {
    useAddOrders(cartProducts.value).response ? toast.success("Pedido realizado correctamente") : toast.error("Algo ha ido mal")
}

</script>
<template>
    <div class="main-cart">
        <div class="previus-step">
            <h3 v-if="stepButtons.previus[stepPosition]" @click="previusStep()">{{ stepButtons.previus[stepPosition] }}</h3>
        </div>
        <div class="cart-container">
            <div v-if="stepPosition == 0">
                <div class="total-price">
                    <h1>Total</h1>
                    <h1 class="price">{{ totalPrice }}€</h1>
                </div>
                <div class="products-list">
                    <ProductsList :key="cartProducts" :products="cartProducts" :isCart="true"/>
                </div>
            </div>
            <div class="step-container" v-if="stepPosition == 1">
                <Payment :key="paymentMethod" :payment="paymentMethod"/>
            </div>
            <div class="step-container submit-cart" v-if="stepPosition == 2">
                <div class="final-products">
                    <ProductsList :key="cartProducts" :products="cartProducts" :isCart="true"/>
                </div>
                <div class="total-cart">
                    <div class="subtotal">
                        <label>Productos</label>
                        <label>{{ totalPrice }}</label>
                    </div>
                    <div class="costs">
                        <label>Envío</label>
                        <label>5€</label>
                    </div>
                    <div class="total">
                        <label>Importe Total</label>
                        <label>{{ totalPrice + 5 }}</label>
                    </div>

                </div>
                <div class="payment">
                    <div>
                        <label>Metodo de pago: </label>
                        <label class="method">{{ paymentMethod.value }}</label>
                    </div>
                    <div class="card-info" v-if="paymentMethod.value == 'targeta'">
                        <div><label>Nombre </label><strong>{{ paymentMethod.name.value }}</strong></div>
                        <div><label>Numero </label><strong>**** **** **** {{ paymentMethod.card_number.value.slice(-4) }}</strong></div>
                    </div>
                </div>
                <div class="address">
                    <h2>Dirección de envío</h2>
                    <CustomInput :step_collection="address"/>
                </div>
            </div>
        </div>
        <div class="next-step">
            <h3 v-if="stepButtons.next[stepPosition]" @click="nextStep()">{{ stepButtons.next[stepPosition] }}</h3>
        </div>
    </div>
</template>
<style scoped>
.main-cart {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    padding: 10px;
    box-sizing: border-box;
}
.cart-container {
    grid-area: 1 / 2 / 2 / 5;
    box-sizing: border-box;
    width: 100%;
    background-color: white;
}

.step-container {
    padding: 10px;
    box-sizing: border-box;
}

.products-list {
    padding: 20px;
    box-sizing: border-box;
}

.total-price {
    display: flex;
    box-sizing: border-box;
    top: 0;
    position: sticky;
    width: 100%;
    justify-content: space-between;
    border-bottom: 2px solid black;
    padding: 20px;
    background-color: white;
}

.price {
    color: orange;
}
.next-step {
    grid-area: 1 / 5 / 2 / 6;
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    
}
.next-step h3 {
    position: sticky;
    top: 15px;
    padding: 15px;
    background-color: orange;
    height: fit-content;
    font-size: 1.3rem;
    color: white;
    border-radius: 30px;
    cursor: pointer;
    transition: transform .3s ease-out;
}
.next-step h3:hover{
    transform: translate(0, -5px);
}

.previus-step {
    grid-area: 1 / 1 / 2 / 2;
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
}
.previus-step h3{
    box-sizing: border-box;
    position: sticky;
    top: 15px;
    padding: 15px;
    background-color: white;
    height: fit-content;
    border: 4px solid orange;
    font-size: 1.3rem;
    color: orange;
    border-radius: 30px;
    cursor: pointer;
    transition: transform .3s ease-out;
}

.previus-step h3:hover{
    transform: translate(0, -5px);
}

.submit-cart {
    display: grid;
    height: 60vh;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    box-sizing: border-box;
}

.submit-cart > div {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
}
.submit-cart .final-products {
    grid-area: 1 / 1 / 4 / 3;
}
.submit-cart .total-cart {
    grid-area: 1 / 3 / 2 / 4; 
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    justify-content: space-evenly;
}

.total-cart > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.total-cart .total {
    border-top: 1px solid black;
    padding-top: 10px;
    font-weight: 900;
    font-size: 1.5rem;
}

.submit-cart .payment {
    grid-area: 2 / 3 / 3 / 4;
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;    
}

.payment .method {
    font-weight: 900;
    text-transform: capitalize;
    height: 20%;
}

.payment .card-info {
    height: 80%;
    border-top: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.card-info > div {
    display: flex;
    justify-content: space-between;
}

.submit-cart .address {
    grid-area: 3 / 3 / 4 / 4;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
