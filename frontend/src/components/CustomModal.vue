<script>
import { ref, reactive, watch } from 'vue';
import CustomInput from "../components/CustomInput.vue"
import { v1 } from "uuid"
import { useAddAlergenos } from "../composables/alergenos/useAlergenos"
import { useAddCategorias } from "../composables/categorias/useCategorias"
import { useToast } from "vue-toast-notification";

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
        const $toastr = useToast({
            position: "top-right",
        });
        const show = ref(props.show)
        const elements = ref(props.data)
        const whereName = ref(props.where)
        const properties = ref(props.properties)
        const showInputs = ref(false)
        const toggleButtons = ref(false)
        const inputs = ref([])
        const item = ref({})
        const DATA_TYPE_KEYS = {
            varchar: "text",
            int: "number"
        }

        elements.value.map((e) => {
            e.icono = (() => {
                if (e.icono != 'icono') {
                    if (String(e.icono).includes("-")) {
                        return e.icono
                    }
                }

                return "md-hideimage-outlined"
            })()
        })

        inputs.value.map((e) => {
            item.value[e.name] = e.value
        })

        properties.value.map((e) => {
            inputs.value.push({
                name: e.COLUMN_NAME,
                type: e.DATA_TYPE,
                disabled: e.COLUMN_NAME.includes("id_"),
                required: true,
                value: e.COLUMN_NAME.includes("id_")
                    ? String(v1()).replace("-", "").slice(0, 10)
                    : ""
            })
        })

        if (typeof properties.value != "undefined") {
            console.log(properties.value);
            properties.value.map((e, i) => {
                properties.value[i].DATA_TYPE = DATA_TYPE_KEYS[e.DATA_TYPE]
            })
        }

        console.log(properties.value);

        function closeModal() {
            show.value = !show.value
        }

        function enableUpdate(element) {
            console.log(element);
            inputs.value.map((e) => {
                // NOTE: Tienen los mismos nombres
            })
        }


        function closeDetails() {
            showInputs.value = false;
            toggleButtons.value = false;
        }

        function createItem() {
            const result = reactive(eval(`useAdd${whereName.value}`)(item.value))
            
            watch(
                () => result.result,
                (v, pv) => {
                    console.log(v);
                    if (v != false) {
                        $toastr.success(`${whereName.value.slice(0, -1)} se ha creado correctamente.`)
                        elements.value.push({
                            nombre: item.value.nombre, 
                            slug: String(item.value.nombre).replace(" ", "_").toLowerCase(), 
                            icono: String(item.value.icono).includes("-") ? item.value.icono : "md-hideimage-outlined"
                        })
                    } else {
                        $toastr.error(`Hubo un error al crear ${whereName.value.slice(0, -1)}, intentelo de nuevo.`)
                    }
                }
            )
        }

        return { closeModal, show, elements, whereName, properties, showInputs, inputs, closeDetails, toggleButtons, createItem, enableUpdate }
    },
    components: {
        CustomInput
    }
}
</script>

<template>
    <div v-if="show" class="blur"></div>
    <div v-if="show" class="main-modal">
        <div class="wrapper">
            <div class="list">
                <div class="card" v-for="element in elements" v-if="!showInputs" @click="enableUpdate(element)">
                    <div class="icon">
                        <v-icon :name="element.icono " scale="2" :fill="element.color || '#7F8F93'" />
                    </div>
                    <div class="info">
                        <div class="title">Nombre: {{ element.nombre }}</div>
                        <div class="slug">Slug: {{ element.slug }}</div>
                    </div>
                </div>

                <div class="inputs" v-if="showInputs">
                    <div class="input-grp" v-for="property in inputs">
                        <div class="group">
                            <input :required="property.required" :type="property.type" v-model="property.value"
                                class="input" :disabled="property.disabled">
                            <!-- <span class="highlight"></span> -->
                            <span class="bar"></span>
                            <label>{{ property.name }}</label>
                        </div>
                    </div>
                </div>

            </div>
            <div class="buttons">
                <div class="statistic-card" v-if="!showInputs" @click="showInputs = true, toggleButtons = true">
                    <div class="card-info">
                        <h2>Añadir {{ whereName }}</h2>
                    </div>
                    <v-icon name="md-add" scale="3" />
                </div>
                <div class="statistic-card" v-if="toggleButtons" @click="createItem()">
                    <div class="card-info">
                        <h2>Aceptar</h2>
                    </div>
                    <v-icon name="ri-save-3-fill" scale="3" />
                </div>
                <div class="statistic-card" v-if="toggleButtons" @click="closeDetails()">
                    <div class="card-info">
                        <h2>Volver</h2>
                    </div>
                    <v-icon name="io-arrow-back-circle-sharp" scale="3" />
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
    overflow-y: scroll;
}

.list::-webkit-scrollbar { display: none; }

.card {
    border-radius: 22px;
    background-color: #ebeaea;
    display: flex;
    width: 100%;
    height: 80px;
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
    flex-direction: column;
    display: flex;
    padding-top: 15px;
    justify-content: center;
    align-items: center;
    background-color: #e0e0e0;
    border-bottom: black 1px solid;
    border-top-right-radius: 20px;
}

.buttons * {
    margin: 15px;
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

.statistic-card:hover * {
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

.inputs {
    grid-area: 1 / 1 / 3 / 3;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    height: 100%;
}

.input-grp {
    margin: 30px;
    width: fit-content;
    height: fit-content;
    text-transform: capitalize;
}

.input-grp .group {
    position: relative;
}

.input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 200px;
    border: none;
    border-bottom: 1px solid #515151;
    background: transparent;
}

.input:focus {
    outline: none;
}

label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

.input:focus~label,
.input:valid~label {
    top: -20px;
    font-size: 14px;
    color: #5264AE;
}

.bar {
    position: relative;
    display: block;
    width: 200px;
}

.bar:before,
.bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264AE;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

.bar:before {
    left: 50%;
}

.bar:after {
    right: 50%;
}

.input:focus~.bar:before,
.input:focus~.bar:after {
    width: 50%;
}

.highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
}

.input:focus~.highlight {
    animation: inputHighlighter 0.3s ease;
}


@keyframes inputHighlighter {
    from {
        background: #5264AE;
    }

    to {
        width: 0;
        background: transparent;
    }
}
</style>