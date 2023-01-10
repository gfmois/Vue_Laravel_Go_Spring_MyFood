<script>
import { reactive, ref, computed, watchEffect, watch } from 'vue';
import ChartComponent from '../../components/admin/ChartComponent.vue';
import { useGetReserves } from '../../composables/reservas/useReservas';
import { useGetProducts } from '../../composables/productos/useProducts';
import { useGetCategories } from '../../composables/categorias/useCategorias';
import { useGetPedidos } from '../../composables/pedidos/usePedidos';
import moment from 'moment';

export default {
    setup() {
        moment.locale("es")
        const comLine = ref(0)
        const comDough = ref(0)
        const comBar = ref(0)
        const num_years = 2;
        const num_months = 12;
        const reservesData = ref(Array.from(Array(num_years), () => Array.from(Array(num_months), () => [])))
        const categoriesData = reactive(useGetCategories().categories)
        const months = moment.monthsShort()

        // Reserves
        const reserves = reactive(useGetReserves().reserves);
        const totalReserves = reactive({ years: [], value: [] })
        const dataline = ref({
            labels: months,
            datasets: [],
        })

        // Products Categories
        const products = reactive(useGetProducts().products);
        const totalProducts = reactive({ values: [] })
        const datadough = ref({
            labels: [],
            datasets: [{
                label: "Productos",
                backgroundColor: [],
                borderColor: "#7c7f91",
                hoverEffect: 10,
                data: []
            }]
        })

        // Orders
        const orders = reactive({ ordersValues: useGetPedidos().pedidos, data: [] })
        const databar = ref({
            labels: months,
            datasets: []
        })

        function dataReserves() {
            watchEffect(() => {
                totalReserves.data = computed(() => reserves.value.map((r) => {
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

                    let ty = totalReserves.years
                    !ty.includes(m.year()) ? ty.push(m.year()) : ""

                    return reservesData.value.map((y) => y.map((m) => m.length))
                }))

                totalReserves.value = totalReserves.data.at(-1)
                delete totalReserves.data

                if (totalReserves.value !== undefined) {
                    totalReserves.value.map((y, i) =>
                        dataline.value.datasets.push({
                            label: totalReserves.years[i],
                            data: y,
                            fill: false,
                            borderColor: `rgb(
                            ${Math.floor(Math.random() * 256)},
                            ${Math.floor(Math.random() * 256)},
                            ${Math.floor(Math.random() * 256)}
                        )`,
                            tension: 0.1
                        })
                    )

                    refresh(comLine)
                }
            })
        }

        function dataProductsCategories() {
            watch(
                () => products.value,
                (vProducts, _) => {
                    totalProducts.values = Array.from(Array(categoriesData.value.length), () => { })
                    categoriesData.value = categoriesData.value.map((c, i) => {
                        totalProducts.values[i] = { nombre: c.nombre, cantidad: c.productos.length }
                        return c.nombre
                    })

                    datadough.value.labels = categoriesData.value

                    let temp = []
                    totalProducts.values.map((e) => {
                        temp.push(e.cantidad)
                    })

                    for (let i = 0; i < categoriesData.value.length; i++) {
                        datadough.value.datasets[0].backgroundColor.push(
                            "hsl(" + 360 * Math.random() + ',' +
                            (25 + 70 * Math.random()) + '%,' +
                            (85 + 10 * Math.random()) + '%)')
                    }

                    datadough.value.datasets[0].data = temp
                    refresh(comDough)
                }
            )
        }

        function dataOrders() {

            function initDataOrders(fecha) {
                orders.data.push({
                    year: fecha.year(),
                    months: Array.from(Array(num_months), (_, i) => i == fecha.month() ? [fecha.format("DD/MM/yyyy")] : [])
                })
            }

            watch(
                () => orders.ordersValues,
                (vOrders, _) => {
                    vOrders.map((o) => {
                        let fecha = moment(`${o.fecha}T00:00:00.000Z`)
                        if (orders.data.length > 0) {
                            let iYear = orders.data.findIndex((e) => e.year == fecha.year());
                            if (iYear == -1) {
                                initDataOrders(fecha)
                            } else {
                                orders.data[iYear].months[fecha.month()].push(fecha.format("DD/MM/yyyy"))
                            }

                        } else {
                            initDataOrders(fecha)
                        }

                    })

                    orders.data.map((y) => {
                        databar.value.datasets.push(
                            {
                                label: y.year,
                                data: y.months.map((m) => m.length),
                                backgroundColor: [
                                    'rgba(255, 0, 0, 0.2)',  // rojo
                                    'rgba(0, 255, 0, 0.2)',  // verde
                                    'rgba(0, 0, 255, 0.2)',  // azul
                                    'rgba(255, 255, 0, 0.2)',  // amarillo
                                    'rgba(0, 255, 255, 0.2)',  // cian
                                    'rgba(255, 0, 255, 0.2)',  // magenta
                                    'rgba(128, 0, 0, 0.2)',  // marrón oscuro
                                    'rgba(0, 128, 0, 0.2)',  // verde oscuro
                                    'rgba(0, 0, 128, 0.2)',  // azul oscuro
                                    'rgba(128, 128, 0, 0.2)',  // amarillo oscuro
                                    'rgba(0, 128, 128, 0.2)',  // cian oscuro
                                    'rgba(128, 0, 128, 0.2)'  // magenta oscuro
                                ],

                            }
                        )
                    })

                    refresh(comBar)
                }
            )
        }

        function refresh(_count) {
            _count.value++
        }

        dataReserves()
        dataProductsCategories()
        dataOrders()

        return { reserves, reservesData, months, totalReserves, dataline, datadough, databar, comDough, comLine, comBar }
    },
    components: { ChartComponent }
}
</script>

<template>
    <div>
        <div class="wrapper">
            <div class="lf-card">
                <ChartComponent :key="comLine" :data="dataline" :type="'line'" />
            </div>
            <div class="rg-card">
                <ChartComponent :key="comDough" :data="datadough" :type="'doug'" />
            </div>
            <div class="bt-card">
                <ChartComponent :key="comBar" :data="databar" :type="'bar'" />
            </div>

        </div>
    </div>
</template>
<style scoped>
.wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 92vw;
    height: 80vh;
    padding: 10px;
}

.wrapper>div {
    border-radius: 20px;
    padding: 10px;
    margin: 3px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.lf-card {
    grid-area: 1 / 1 / 3 / 3;
    background-color: #ededed;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rg-card {
    grid-area: 1 / 3 / 3 / 5;
    background-color: #ededed;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bt-card {
    grid-area: 3 / 1 / 5 / 5;
    background-color: #ededed;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>