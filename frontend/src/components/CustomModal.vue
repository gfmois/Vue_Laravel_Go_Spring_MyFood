<script>
import { ref, watch } from 'vue';

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data: [],
        properties: [],
        where: {
            type: String,
            default: "",
            required: true
        },
    },
    setup(props) {
        const show = ref(props.show)
        const elements = ref(props.data)
        const whereName = ref(props.where)
        const properties = ref(props.properties)
        const inputs = ref(false)
        const DATA_TYPE_KEYS = {
            "varchar": "string",
            "int": "number"
        }

        elements.value.map((e) => {
            e.icono = e.icono != 'icono' 
                ? e.icono 
                : 'md-hideimage-outlined'  
        })

        if (typeof properties.value != "undefined") {
            console.log(properties.value);
            properties.value.map((e, i) => {
                console.log(e);
                console.log(DATA_TYPE_KEYS[e.DATA_TYPE], e.DATA_TYPE);
                properties.value[i].DATA_TYPE = DATA_TYPE_KEYS[e.DATA_TYPE]
            })
        }

        console.log(properties.value);

        function closeModal() {
            show.value = !show.value
        }

        return { closeModal, show, elements, whereName, properties, inputs }
    }
}
</script>

<template>
    {{ properties }}
    <div v-if="show" class="blur"></div>
    <div v-if="show" class="main-modal">
        <div class="wrapper">
            <div class="list">
                <div class="card" v-for="element in elements" v-if="!inputs">
                    <div class="icon">
                        <v-icon :name="element.icono" scale="2" :fill="element.color || '#7F8F93'" />
                    </div>
                    <div class="info">
                        <div class="title">Nombre: {{ element.nombre }}</div>
                        <div class="slug">Slug: {{ element.slug }}</div>
                    </div>
                </div>

                <div class="inputs" v-if="inputs">
                    <div class="input" v-for="property in properties">
                        
                    </div>
                </div>

            </div>
            <div class="buttons">
                <div class="statistic-card" @click="inputs = true">
                    <div class="card-info">
                        <h2>Añadir {{ whereName }}</h2>
                    </div>
                    <v-icon name="md-add" scale="3" />
                </div>
            </div>
            <div class="exit">
                <div class="statistic-card" @click="closeModal(), $emit('close', false)">
                    <div class="card-info">
                        <h2>Cerrar</h2>
                    </div>
                    <v-icon name="md-close" scale="3" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .blur {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        backdrop-filter: blur(16px);
    }
    .main-modal {
        position: absolute;
        z-index: 4;
        width: 93vw;
        height: 85vh;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
    }
    .wrapper {
        z-index: 9999;
        width: 80vw;
        height: 70vh;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .list {
        grid-area: 1 / 1 / 4 / 3;
        background-color: #b9dce8;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(7, 1fr);
        grid-row-gap: 10px;
        grid-column-gap: 10px;
        border-right: black 1px solid;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .card {
        border-radius: 22px;
        background-color: #ebeaea;
        display: flex;
        width: 100%;
        gap: 10px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .card:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color: white;
    }
    
    .card .icon {
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 22px;
    }

    .card .info {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        text-align: left;
        font-size: 1.2rem;
    }

    .buttons {
        grid-area: 1 / 3 / 3 / 4;
        display: flex;
        padding-top: 15px;
        justify-content: center;
        background-color: #e0e0e0;
        border-bottom: black 1px solid;
        border-top-right-radius: 20px;
    }

    .exit {
        grid-area: 3 / 3 / 4 / 4;
        background-color: blueviolet;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background-color: #e0e0e0;
        border-bottom-right-radius: 20px;
    }

    .statistic-card {
        padding: 10px;
        background-color: white;
        box-sizing: border-box;
        width: 80%;
        height: 20%;
        display: flex;
        padding: 30px;
        justify-content: space-around;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
        border-radius: 20px;
        cursor: pointer;
        transition: transform .3s ease-out;
    }
    
    .statistic-card:hover {
        transform: translate(0, -5px);
    }
    
    .statistic-card:hover *{
        fill: #00aae4;
    }
    
    .statistic-card * {
        fill: #888888;
    }
    
    .card-info {
        display: flex;
        flex-direction: column;
    }
    
    .card-info h2 {
        color: #00aae4;
        font-weight: 700;
        font-size: 2rem;
    }
</style>