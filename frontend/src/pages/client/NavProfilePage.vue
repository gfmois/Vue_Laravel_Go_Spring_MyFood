<script>
import { RouterView } from 'vue-router'
import { ref, watch, reactive, computed } from 'vue';
import { useGetUserProfile } from "../../composables/clientes/useClientes"
import { useGetClientOrders } from '../../composables/pedidos/usePedidos';
import { useGetClientReserves } from "../../composables/reservas/useReservas"
import moment from 'moment';


export default {
    setup() {
        moment.locale("es-ES")
        const reservesData = ref(Array.from(Array(1), () => Array.from(Array(12), () => [])))
        const reserves = reactive({ fromDB: useGetClientReserves().reserves, finalData: { years: [], value: [] } , dataline: {
            labels: moment.monthsShort(),
            datasets: []
        }})

        const orders = reactive({
            fromDB: useGetClientOrders().response, finalData: [], dataline: {
                labels: moment.monthsShort(),
                datasets: []
            }
        })

        const userProfile = reactive(useGetUserProfile().client)

        function initDataOrders(fecha) {
            orders.finalData.push({
                year: fecha.year(),
                months: Array.from(Array(12), (_, i) => i == fecha.month() ? [fecha.format("DD/MM/yyyy")] : [])
            })
        }

        watch(
            () => reserves.fromDB,
            (v, pv) => {
                v = v.reservas
                reserves.finalData.value = v.map((r) => {
                    let m = moment(`${r.fecha}T00:00:00.000Z`)

                    if (m.year() == new Date().getFullYear()) {
                        if (!reservesData.value[0][m.month()].includes(m.format("DD/MM/yyyy"))) {
                            reservesData.value[0][m.month()].push(m.format("DD/MM/yyyy"));
                        }

                    } else {
                        if (!reservesData.value[1][m.month()].includes(m.format("DD/MM/yyyy"))) {
                            reservesData.value[1][m.month()].push(m.format("DD/MM/yyyy"));
                        }
                    }

                    reserves.finalData.years.push(m.year())
                    
                    return reservesData.value.map((y) => y.map((m) => m.length))
                })
                
                if (reserves.finalData !== undefined) {
                    reserves.dataline.datasets.push({
                        label: `RESERVAS ${reserves.finalData.years[0] || new Date().getFullYear()}`,
                        data: reserves.finalData.value.at(-1),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    })

                    reserves.dataline.datasets[0].data = reserves.dataline.datasets[0].data.flat();
                }
            }
        )

        watch(
            () => orders.fromDB,
            (v, pv) => {
                v = v.orders
                v.map((i) => {
                    let fecha = moment(`${i.fecha}T00:00:00.000Z`)
                    if (orders.finalData.length > 0) {
                        let iYear = orders.finalData.findIndex((e) => e.year == fecha.year())
                        if (iYear == -1) {
                            initDataOrders(fecha)
                        } else {
                            orders.finalData[iYear].months[fecha.month()].push(fecha.format("DD/MM/yyyy"))
                        }
                    } else {
                        initDataOrders(fecha)
                    }
                })

                orders.finalData.map((y) => {
                    orders.dataline.datasets.push(
                        {
                            label: `PEDIDOS ${y.year}`,
                            data: y.months.map((m) => m.length),
                            borderColor: 'rgb(75, 192, 192)'
                        }
                    )
                })
            }
        )

        return { orders, reserves, userProfile }
    },
    components: {
        RouterView
    }
}
</script>

<template>
    <div class="main">
        <div class="wrapper">
            <div class="tl-nav" @click="$router.push('/perfil')">Perfil</div>
            <div class="tm-nav" @click="$router.push('/perfil/pedidos')">Mis Pedidos</div>
            <div class="tr-nav" @click="$router.push('/perfil/reservas')">Mis Reservas</div>
            <div class="body">
                <RouterView v-bind:orders="orders" v-bind:reserves="reserves" v-bind:profile="userProfile" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.wrapper {
    width: 80vw;
    height: 70vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.wrapper>div {
    display: flex;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.tl-nav {
    grid-area: 1 / 1 / 2 / 2;
    align-items: center;
    height: 100%;
    background-color: #d3e0e1;
    cursor: pointer;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.tm-nav {
    grid-area: 1 / 2 / 2 / 3;
    align-items: center;
    height: 100%;
    cursor: pointer;
    background-color: #d3e0e1;
    border-right: 1px solid rgb(174, 172, 172);
    border-left: 1px solid rgb(174, 172, 172);
}

.tr-nav {
    grid-area: 1 / 3 / 2 / 4;
    align-items: center;
    height: 100%;
    cursor: pointer;
    background-color: #d3e0e1;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.body {
    grid-area: 2 / 1 / 6 / 4;
    border-radius: 20px;
    height: 100%;
    margin-top: 10px;
    box-sizing: border-box;
}

.tr-nav:hover {
    background-color: #f0f0f0;
}

.tl-nav:hover {
    background-color: #f0f0f0;
}

.tm-nav:hover {
    background-color: #f0f0f0;
}
</style>