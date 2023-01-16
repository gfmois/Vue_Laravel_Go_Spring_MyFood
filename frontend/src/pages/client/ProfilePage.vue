<script>
import { ref, reactive, watch, computed } from 'vue';
import ChartComponent from '../../components/admin/ChartComponent.vue';
import { useToast } from "vue-toast-notification";
import { useUpdateProfile } from '../../composables/clientes/useClientes';


export default {
    props: {
        orders: {},
        reserves: {},
        profile: {}
    },
    setup(props) {
        const orders = reactive({ value: props.orders.dataline })
        const reserves = reactive({ value: props.reserves.dataline })
        const profile = reactive({ value: props.profile })
        const itemToUpdate = computed({
            get: () => {
                return {
                    nombre: profile.value.nombre,
                    telefono: profile.value.telefono,
                    email: profile.value.email,
                    contraseña: "",
                    c_contraseña: ""
                }
            }
        })

        const $toastr = useToast({
            position: "top-right",
        });

        const oCount = ref(0)
        const rCount = ref(0)

        setTimeout(() => {
            refresh(oCount)
            refresh(rCount)
        }, 250)

        const ordersValue = computed({
            get: () => orders.value,
            set: (nOrders) => orders.value = nOrders
        })

        const reservesValue = computed({
            get: () => reserves.value,
            set: (nReserves) => reserves.value = nReserves
        })

        const profileValue = computed({
            get: () => profile.value,
            set: (nProfile) => profile.value = nProfile
        })

        function refresh(c) {
            c.value++
        }

        function updateProfile() {
            if (itemToUpdate.value.contraseña === itemToUpdate.value.c_contraseña) {

                if (itemToUpdate.value.contraseña == "") {
                    delete itemToUpdate.value.contraseña
                    delete itemToUpdate.value.c_contraseña
                }

                delete itemToUpdate.value.c_contraseña
                const result = reactive(useUpdateProfile(itemToUpdate.value).result)

                if (result != false) {
                    $toastr.success("Perfil Actualizado")
                } else {
                    $toastr.error("Error al actualizar el perfil, intentelo mas tarde.")
                }
            } else {
                $toastr.error("Las contraseñas no coinciden")
            }
        }

        return { ordersValue, oCount, rCount, reservesValue, profile, profileValue, itemToUpdate, updateProfile }
    },
    components: {
        ChartComponent
    }
}

</script>

<template>
    <div class="profile-wrapper">
        <div class="lf-site">
            <div class="profile-card">
                <div class="img-wrapper">
                    <div class="img-card">
                        <img :src="profile.value.avatar" alt="" class="client-avatar">
                    </div>
                </div>
                <div class="client-info-card">
                    <div class="info">
                        <h1 class="name">{{ profileValue.nombre }}</h1>
                        <h3 class="email">{{ profileValue.email }}</h3>
                    </div>
                </div>
            </div>
            <div class="update-site">
                <div class="u-lf-top">
                    <input type="text" placeholder="Nombre" name="name" class="input" autocomplete="off"
                        v-model="itemToUpdate.nombre" />
                </div>
                <div class="u-rg-top">
                    <input type="text" placeholder="Correo Electrónico" name="email" class="input" autocomplete="off"
                        v-model="itemToUpdate.email" disabled />
                </div>
                <div class="u-rg-bt">
                    <input type="text" placeholder="Teléfono" name="phone" class="input" autocomplete="off"
                        v-model="itemToUpdate.telefono" />
                </div>
                <div class="u-lf-bt">
                    <input type="password" placeholder="Contraseña" name="password" class="input" autocomplete="off"
                        v-model="itemToUpdate.contraseña" />
                </div>
                <div class="u-rg-bt-2">
                    <input type="password" placeholder="Confirmar Contraseña" name="password" class="input"
                        autocomplete="off" v-model="itemToUpdate.c_contraseña" />
                </div>

                <div class="u-rg-btm-button" @click="updateProfile()">
                    <div class="accept-btn">Actualizar</div>
                </div>
            </div>
        </div>

        <div class="rg-top-site">
            <ChartComponent v-if="ordersValue.datasets.length > 0" :key="oCount" :data="ordersValue" :type="'line'" />
            <h1 v-if="!ordersValue.datasets.length > 0">No tienes Pedidos todavía</h1>
        </div>

        <div class="rg-btm-site">
            <ChartComponent v-if="reservesValue.datasets.length > 0" :key="rCount" :data="reservesValue"
                :type="'line'" />
            <h1 v-if="!reservesValue.datasets.length > 0"></h1>
        </div>
    </div>
</template>

<style>
.profile-wrapper {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    border-radius: 20px;
}

.lf-site {
    grid-area: 1 / 1 / 3 / 2;
}

.rg-top-site {
    grid-area: 1 / 2 / 2 / 3;
    width: 100%;
}

.rg-btm-site {
    grid-area: 2 / 2 / 3 / 3;
    width: 100%;
}

.name {
    text-transform: capitalize;
}

.profile-card {
    background-color: rgb(244, 244, 244);
    height: 25%;
    display: flex;
    align-items: center;
}

.img-wrapper {
    background-color: transparent;
    padding: 10px;
    margin: 10px;
    width: fit-content;
}

.update-site {
    box-sizing: border-box;
    height: 75%;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.u-lf-btm-button {
    grid-area: 4 / 1 / 4 / 1;
}

.accept-btn {
    width: 100%;
    padding: 10px;
    text-align: center;
    text-transform: uppercase;
    color: rgb(14, 113, 183);
    background-color: #F2F2F2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: x-large;
    height: 45px;
    border-radius: 5px;
    border: 2.5px solid #E0E1E4;
    box-shadow: 0px 0px 20px -20px;
    cursor: pointer;
    background-color: white;
    transition: all 0.2s ease-in-out 0ms;
    user-select: none;
    font-family: 'Poppins', sans-serif;
}

.accept-btn:hover {
    color: #F2F2F2;
    background-color: rgb(14, 113, 183);
    box-shadow: 0px 0px 20px -18px;
}

.accept-btn:active {
    transform: scale(0.95);
}

.u-rg-btm-button {
    grid-area: 4 / 1 / 5 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.u-lf-bt {
    grid-area: 3 / 1 / 3 / 1;
}

.u-rg-bt-2 {
    grid-area: 3 / 2 / 3 / 2;
}

.img-card {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
}

.info {
    height: 100%;
    width: 100%;
    color: #0f0f0f;
}

.info>h1 {
    font-size: 36px;
}

.info>h3 {
    font-size: 20px;
}

.client-avatar {
    width: 100%;
}

.input {
    width: 100%;
    max-width: 220px;
    height: 45px;
    padding: 12px;
    border-radius: 12px;
    border: 1.5px solid lightgrey;
    outline: none;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0px 0px 20px -18px;
}

.input:hover {
    border: 2px solid lightgrey;
    box-shadow: 0px 0px 20px -17px;
}

.input:active {
    transform: scale(0.95);
}

.input:focus {
    border: 2px solid grey;
}
</style>