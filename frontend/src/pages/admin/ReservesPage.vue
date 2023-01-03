<script>
import QrReaderComponentVue from '../../components/QrReaderComponent.vue';
import { ref } from 'vue';

export default {
    components: {
        QrReaderComponentVue
    },
    data: () => ({
        clicked: false  
    }),
}
</script>
<template>
<div class="main">
    <div class="qr-reader">
         <v-icon name="bi-qr-code-scan" scale="2" @click="clicked = true" />
        <QrReaderComponentVue @open_close="clicked = $event" v-if="clicked" />
    </div>
    <table>
        <thead>
            <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Nº Comensales</th>
                <th>Servicio</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="i in 5">
                <td>Hola</td>
                <td>Hola</td>
                <td>Hola</td>
                <td>Hola</td>
                <td>Hola</td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<style scoped>
.qr-reader {
    position: absolute;
    top: 20px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    width: 60px;
    height: 60px;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    max-height: 80vh;
    overflow: hidden;
    overflow-y: scroll;
    width: 100%;
    border-radius: 10px;
}
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
@media (min-device-width: 768px){
    .qr-reader {
        display: none;
    }
}
@media (max-width: 500px) {
    .main {
        border-radius: 0px;
    }
    .qr-reader {
        top: 10px;
    }
    th:nth-child(3), td:nth-child(3){
        display: none;
    }
}

</style>