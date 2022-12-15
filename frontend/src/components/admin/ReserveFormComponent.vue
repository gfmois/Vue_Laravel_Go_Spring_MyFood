<script>
import CustomInputVue from '../CustomInput.vue';
    export default {
        setup() {
            const info_inputs = {
                name: "Información Cliente",
                // tag: "div",
                children: [
                    {
                        name: "test",
                        tag: "div",
                        value: "asdf"
                    },
                    {
                        name: "test2",
                        tag: "div",
                        value: "asdf2"
                    }
                ]
            }

            return { info_inputs }
        },
        components: {
            CustomInputVue
        }
    }
</script>

<template>
    <div class="wrapper">
        <div class="card">
            <div class="title">{{ info_inputs.name }}</div>
            <div class="input-wrapper">
                <CustomInputVue :step_collection="info_inputs" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    background-color: aquamarine;
}
</style>