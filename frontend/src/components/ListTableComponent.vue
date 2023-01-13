<script>
import { ref } from "vue"
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import json from "../assets/json/loading_food.json"


export default {
    props: {
        thead: [],
        tbody: [],
        route: ""
    },
    setup(props) {
        const tbody = ref(props.tbody)
        const thead = ref(props.thead) 
        const data = ref(typeof props.tbody != "undefined")
        const methods = ref()
        const tableMethods = ref()

        if (data.value) {
            methods.value = Object.keys(props.tbody[0] || props.tbody)
            tableMethods.value = Object.keys(props.tbody[0] || props.tbody).splice(1)
        }

        return { tbody, thead, route: props.route, json, data, methods, tableMethods }
    },
    components: {
        Vue3Lottie
    }
}
</script>
<template>
    <table v-if="data">
        <thead>
            <tr>
                <th v-for="h in thead">{{ h }}</th> 
            </tr>
        </thead>
        <tbody>
            <tr v-for="i in tbody" @click="$router.push({ path: `${route}/${i[methods[0]]}`, replace: false })">
                <td v-for="m in tableMethods">{{ i[m] }}</td>
            </tr>
        </tbody>
    </table> 
    <div class="no-data-container" v-if="!data">
        <Vue3Lottie :animationData="json" :height="400" :width="400" />
        <h1>Cargando {{ route }}</h1>
    </div>
</template>
<style scoped>
table {
    width: 100%;
    position: relative;
    border-radius: 20px;
    text-align: center;
}
* {
    border-collapse: collapse;
    box-sizing: border-box;
}

.no-data-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 10px;
}

th,td {
    padding: 15px;
    font-size: 1.2rem;
}
th {
    top: 0;
    position: sticky;
    background-color: #362e4a;
    padding: 10px;
    color: white;
}

tbody {
    overflow-y: scroll;
}
tr:nth-child(2n) {
    background-color: #f6f7f7;
}

tr:hover {
    cursor: pointer;
    background-color: #a69bf932;
}
@media (max-width: 500px) {
    .main {
        border-radius: 0px;
    }
    th:nth-child(4), td:nth-child(4){
        display: none;
    }
}
</style>