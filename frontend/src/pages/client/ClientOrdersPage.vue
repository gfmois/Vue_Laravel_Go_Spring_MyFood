<script>
import { reactive, computed, ref } from "vue";
import ListTableComponent from "../../components/ListTableComponent.vue"

export default {
    props: {
        orders: {}
    },
    components: {
        ListTableComponent
    },
    setup(props) {
        const orders = reactive({ value: props.orders.fromDB.orders, keys: props.orders.fromDB.orders })
        const keys = ref(["Comensales", "Fecha", "Productos Pedidos"])

        const ordersValue = computed({
            get: () => orders.value,
            set: (nOrder) => orders.value = nOrder
        })

        return { ordersValue, keys }
    }
}

</script>

<template>
    <div class="main-orders">
        <div class="grid">
            <div class="order" v-for="order in ordersValue">
                <div class="icon">
                    <v-icon scale="3" name="bi-cart" />
                </div>
                <div class="info-order">
                    <div class="estado">Estado: {{ order.estado }}</div>
                    <div class="fecha">Fecha: {{ order.fecha }}</div>
                    <div class="n_pedidos">Productos Pedidos: {{ order.productos_pedidos.length }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.main-orders {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
}

.order {
    align-items: center;
    padding-left: 10px;
    border-radius: 20px;
    display: flex;
    max-width: 450px;
    max-height: 80px;
    background-color: azure;
}

.icon {
    width: 20%;
}

.grid {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: rgb(200, 200, 200);
    display: grid;
    border-radius: 20px;
    padding: 5px;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}



</style>