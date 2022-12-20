<script>
export default {
    props: {
        show: Boolean,
        header: "",
        body: "",
        route: ""
    }
}
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3 name="header">{{ header }}</h3>
                    </div>

                    <div class="modal-body">
                        <slot name="body">{{ body }}</slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button modal-accept-button" @click="$emit('close', false)">Cerrar</button>
                            <button class="modal-default-button modal-cancel-button" @click="$router.push(route)">Aceptar</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 65vh;
    margin: 0px auto;
    background-color: #fff;
    
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    box-sizing: border-box;
}
.modal-header {
    background-color: #42b983;
    padding: 15px;
}

.modal-header h3 {
    color: white;
}

.modal-footer {
    box-sizing: border-box;
    height: 5vh;
    margin-right: 10px;
    padding-bottom: 10px;
}

.modal-body {
    height: 65%;
    padding: 15px;
    box-sizing: border-box;
}

.modal-default-button {
    float: right;
}

.modal-cancel-button, .modal-accept-button {
    height: 100%;
    padding-right: 10px;
    padding-left: 10px;
    margin-left: 10px;
    font-size: 1.25rem;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid rgb(198, 198, 198);
}

.modal-cancel-button:hover {
    background-color: #FF3C38;
    color: white;
}

.modal-accept-button:hover {
    background-color: #c3c3c3;
    color: black;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
