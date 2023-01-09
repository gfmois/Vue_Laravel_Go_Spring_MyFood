<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement
} from "chart.js"
import { Bar, Line, Doughnut } from "vue-chartjs"
import { reactive, computed } from "vue"
export default {
    props: {
        type: String,
        data: Array
    },
    setup(props) {
        ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement)
        const options = { responsive: true }
        const type = props.type
        const data = reactive(props.data)
        const comptData = computed(() => data)

        return { options, comptData, type }
    },
    components: {
        Bar,
        Line,
        Doughnut
    }
}
</script>
<template>
    <div>
        <Bar v-if="type == 'bar'" :data="comptData" :options="options" />
        <Line v-if="type == 'line'" :data="comptData" :options="options" />
        <Doughnut v-if="type == 'doug'" :data="comptData" :options="options" />
    </div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>