<script>
import { reactive, ref, computed, watchEffect } from 'vue';
import ChartComponent from '../../components/admin/ChartComponent.vue';
import { useGetReserves } from '../../composables/reservas/useReservas';
import { useGetProducts } from '../../composables/productos/useProducts';
import moment from 'moment';

export default {
    setup() {
        moment.locale("es")
        const count = ref(0)
        const num_years = 2;
        const num_months = 12;
        const data = ref(Array.from(Array(num_years), () => Array.from(Array(num_months), () => [])))
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

        function dataReserves() {
            watchEffect(() => {
                totalReserves.data = computed(() => reserves.value.map((r) => {
                    let m = moment(`${r.fecha}T00:00:00.000Z`)

                    if (m.year() == new Date().getFullYear()) {
                        if (!data.value[0][m.month()].includes(m.format("DD/MM/yyyy"))) {
                            data.value[0][m.month()].push(m.format("DD/MM/yyyy"));
                        }

                    } else { // FIXME: Solo los del año pasado
                        if (!data.value[1][m.month()].includes(m.format("DD/MM/yyyy"))) {
                            data.value[1][m.month()].push(m.format("DD/MM/yyyy"));
                        }
                    }

                    let ty = totalReserves.years
                    !ty.includes(m.year()) ? ty.push(m.year()) : ""

                    return data.value.map((y) => y.map((m) => m.length))
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

                    refresh()
                }
            })
        }

        function dataProductsCategories() {
            watchEffect(() => {
                
            })
        }

        function refresh() {
            count.value++   
        }

        dataReserves()

        return { reserves, data, months, totalReserves, dataline, count }
    },
    components: { ChartComponent }
}
</script>

<template>
    <div>
        <div class="wrapper">
            <div class="lf-card">
                <ChartComponent :key="count" :data="dataline" :type="'line'" />
            </div>
            <div class="rg-card">
                <!-- <ChartComponent :key="count" :data="dataline" :type="'doug'" /> -->
            </div>
            <div class="bt-card">
                <!-- <ChartComponent :labels="months" /> -->
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
    background-color: red;
    width: 92vw;
    height: 80vh;
    padding: 10px;
}

.wrapper>div {
    border-radius: 20px;
    padding: 10px;
    margin: 3px;
}

.lf-card {
    grid-area: 1 / 1 / 3 / 3;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rg-card {
    grid-area: 1 / 3 / 3 / 5;
    background-color: rgb(186, 138, 223);
    display: flex;
    align-items: center;
    justify-content: center;
}

.bt-card {
    grid-area: 3 / 1 / 5 / 5;
    background-color: rgb(83, 186, 60);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>