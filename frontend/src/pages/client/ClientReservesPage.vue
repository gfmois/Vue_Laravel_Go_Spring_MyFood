<script>
import { reactive, computed, ref } from "vue";
import ListTableComponent from "../../components/ListTableComponent.vue"

export default {
    props: {
        reserves: {}
    },
    components: {
        ListTableComponent
    },
    setup(props) {
        const reserves = reactive({ value: props.reserves.fromDB.reservas })

        const reservesValue = computed({
            get: () => reserves.value,
            set: (nOrder) => reserves.value = nOrder
        })

        return { reservesValue }
    }
}

</script>

<template>
    <div class="main-reserves">
        <div class="grid">
            <div class="order" v-for="order in reservesValue">
                <div class="icon">
                    <v-icon scale="3" name="bi-table" />
                </div>
                <div class="info-order">
                    <div class="estado">Estado: {{ order.estado }}</div>
                    <div class="fecha">Fecha: {{ order.fecha }}</div>
                    <div class="n_comensales">Comensales: {{ order.n_comensales }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.main-reserves {
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