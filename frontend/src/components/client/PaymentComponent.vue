<script>
import { reactive } from 'vue';
import { CustomInput } from '../'
export default {
    props:{
        payment: Object
    },
    setup(props) {
        const focusInput = (input) => {
            document.getElementById(input).click()
            props.payment.value = input
        }
        return { focusInput }
    },
    components: {
        CustomInput
    }
    
}


</script>
<template>
    <div class="main-payment">
        <div class="payment-method" @click="focusInput('contrareembolso')">
            <input type="radio" id="contrareembolso" class="payment-radio" name="paymentMethod" value="contrareembolso" v-model="payment.value">
            <div class="img-method">
                <img src="/src/assets/IMG/cash-on-delivery.png">
            </div>
            <div class="info-method">
                <h1>Contrareembolso</h1>
                <p>Paga en efectivo al transportista y recibe el pedido</p>
            </div>
        </div>
        <div class="payment-method" @click="focusInput('targeta')">
            <input type="radio" id="targeta" class="payment-radio" name="paymentMethod" value="targeta" v-model="payment.value"> 
            <div class="cart">
                <div class="credit-cart front-credit-cart">
                    <div class="div3">
                        <img src="/src/assets/IMG/pin_targeta.png">
                    </div>
                    <div class="div5 cart-text-decoration">
                        <label v-for="number in payment.card_number.value.match(/.{1,4}/g) || []">{{ number }}</label>
                    </div>
                    <div class="div6 cart-text-decoration">
                        <label v-for="name in payment.name.value.split(' ')">{{ name }}</label>
                        <label class="date-cart">{{ payment.expiration.value }}</label>
                    </div>
                    <div class="div7">
                        <img src="/src/assets/IMG/logo-Mastercard.png">
                    </div>
                </div>
                <div class="credit-cart back-credit-cart">
                    <div class="url-cart">
                        <label>www.myfood.es</label>
                    </div>
                    <div class="black-section">
                    </div>
                    <div class="signature">
                        <label>{{ payment.security_code.value }}</label>
                    </div>
                </div>
            </div>
            <div class="credit-cart-info">
                <div class="input1">
                    <CustomInput :step_collection="payment.name" />
                </div>
                <div class="input2">
                    <CustomInput :step_collection="payment.card_number" />
                </div>
                <div class="input3">
                    <CustomInput :step_collection="payment.expiration" />
                </div>
                <div class="input4">
                    <CustomInput :step_collection="payment.security_code" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

.main-payment {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    gap: 20px;
    box-sizing: border-box;
}

.payment-method {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    height: 50vh;
    width: 45%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

}

.payment-radio {
    display: none;
}

.payment-method:hover,
.payment-method:has(.payment-radio:checked) {
    border: 4px solid lightblue;
}

.payment-method:has(.payment-radio:checked) .info-method {
    display: flex;
}

.payment-method .img-method {
    height: 30%;
    display: flex;
    justify-content: center;
}


.payment-method .img-method img {
    height: 100%;
}

.payment-method .info-method {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
}

.payment-method:has(.payment-radio:checked) .credit-cart-info {
    display: grid;
    transition: all 0.8s ease;
}

.payment-method .credit-cart-info {
    display: none;
    height: 50%;
    padding: 10px;
    box-sizing: border-box;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
}

.credit-cart-info>div {
    width: 100%;
    display: flex;
    justify-content: center;

}

.input1 {
    grid-area: 1 / 1 / 2 / 3;
}

.input2 {
    grid-area: 2 / 1 / 3 / 3;
}

.input3 {
    grid-area: 3 / 1 / 4 / 2;
}

.input4 {
    grid-area: 3 / 2 / 4 / 3;
}

.payment-method .cart {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

}

.credit-cart {
    transition: all 0.8s ease;
    backface-visibility: hidden;
    width: 313px;
    height: 195px;
    box-sizing: border-box;
    border-radius: 10px;
    position: absolute;

}

.front-credit-cart {
    background-color: lightblue;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
}

.front-credit-cart img {
    max-width: 100%;
    max-height: 100%;
}

.cart-text-decoration {
    font-family: Share Tech Mono;
    color: black;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    font-size: 1.3rem;
    display: flex;
    justify-content: space-evenly;
}

.div1 {
    grid-area: 1 / 1 / 2 / 3;
}

.div2 {
    grid-area: 1 / 3 / 2 / 5;
}

.div3 {
    grid-area: 2 / 1 / 3 / 2;
}

.div4 {
    grid-area: 2 / 2 / 3 / 5;
}

.div5 {
    grid-area: 3 / 1 / 4 / 5;
}

.div6 {
    grid-area: 4 / 1 / 5 / 4;
    font-size: 1rem;
    align-items: center;
    position: relative;
}

.div7 {
    grid-area: 4 / 4 / 5 / 5;
}

.date-cart {
    position: absolute;
    top: 0;
    right: 25%;

}

.back-credit-cart {
    transform: rotateY(-180deg);
    background-color: lightblue;
    display: flex;
    flex-direction: column;
}

.url-cart {
    text-align: center;
}

.black-section {
    height: 20%;
    background-color: black;
}

.signature {
    padding: 7px;
    margin: 10px;
    box-sizing: border-box;
    background-color: grey;
    font-style: italic;
    text-align: end;

}

.cart:hover .front-credit-cart {
    transform: rotateY(180deg);
}

.cart:hover .back-credit-cart {
    transform: rotateY(0deg);
}
</style>