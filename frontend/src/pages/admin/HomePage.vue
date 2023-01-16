<script>
import { reactive, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useGetClientes, useGetClientProperties } from "../../composables/clientes/useClientes"
import CustomModal from '../../components/CustomModal.vue'

export default {
    setup() {
        const clients = reactive({ fromDB: useGetClientes().clients, properties: useGetClientProperties().properties })
        const showUsersModal = ref(false)
        const uItem = ref({})
        const dItem = ref({})

        let routes = [
            {
                icon: "bi-house-fill",
                scale: "2.2",
                name: "Dasboard",
                path: "dashboard",
                isRoute: true
            },
            {
                icon: "bi-box2-fill",
                scale: "2",
                name: "Productos",
                path: "productos",
                isRoute: true
            },
            {
                icon: "io-calendar-clear",
                scale: "2",
                name: "Reservas",
                path: "reservas",
                isRoute: true
            },
            {
                icon: "fa-user",
                name: "Clientes",
                scale: "2",
                isRoute: false
            }
        ]

        watch(
            () => dItem.value,
            (v, pv) => {
                // Elimina el usuario del array de usuarios para que no aparezva en el listado.
                clients.fromDB.splice(clients.fromDB.findIndex(e => e.id_cliente == v.id_cliente), 1)
            },
            { deep: true }
        )

        watch(
            () => uItem.value,
            (v, pv) => {
                clients.fromDB[clients.fromDB.findIndex((e) => e.id_cliente == v.id_cliente)] = v
            }
        )

        return { routes, clients, showUsersModal, uItem, dItem }
    },
    components: {
        CustomModal
    }
}
</script>
<template>
    <div class="admin-panel">
        <input type="checkbox" id="show_menu" class="show-menu">
        <aside>
            <div class="logo-wrapper">
                <div class="logo" @click="$router.push('/')">
                    <img src="../../assets/MyFood.png">
                </div>
                <div class="app-name" @click="$router.push('/')">
                    <h1>MyFood</h1>
                </div>
            </div>
            <ul>
                <li v-for="route in routes" :class="{ active: route.path === $route.name }"
                    @click="route.isRoute ? $router.replace({ path: '/admin/' + route.path }) : showUsersModal = true">
                    <v-icon :name="route.icon" fill="white" :scale="route.scale" />
                    <p>{{ route.name }}</p>
                </li>
            </ul>
            <div class="return" @click="$router.push('/')">
                <v-icon name="md-exittoapp-twotone" fill="white" scale="2" />
                <p>Volver</p>
            </div>
        </aside>
        <main>
            <nav>
                <label class="hamburger-lines" for="show_menu">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </label>
                <div class="user-image">
                    <img src="/src/assets/IMG/Ximo.png">
                </div>
            </nav>
            <div class="main-admin">
                <CustomModal v-if="showUsersModal" @updatedItem="uItem = $event" :key="showUsersModal"
                    :properties="clients.properties" :where="'Clientes'" :data="clients.fromDB"
                    @close="showUsersModal = $event" @deletedItem="dItem = $event" :show="showUsersModal" />
                <RouterView />
            </div>
        </main>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

.hamburger-lines {
    height: 26px;
    width: 32px;
    top: 17px;
    left: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
}

.hamburger-lines .line {
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 10px;
    background: #0e2431;
}

.hamburger-lines .line1 {
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
}

.hamburger-lines .line2 {
    transition: transform 0.2s ease-in-out;
}

.hamburger-lines .line3 {
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
}

input[type="checkbox"]:checked~main nav .hamburger-lines .line1 {
    transform: rotate(45deg);
}

input[type="checkbox"]:checked~main nav .hamburger-lines .line2 {
    transform: scaleY(0);
}

input[type="checkbox"]:checked~main nav .hamburger-lines .line3 {
    transform: rotate(-45deg);
}

input[type="checkbox"]:checked~main {
    width: 80%;
}

input[type="checkbox"]:checked~aside {
    width: 20%;
}

input[type="checkbox"]:checked~aside .app-name {
    display: block;
}

input[type="checkbox"]:checked~aside ul li p {
    display: block;
}

input[type="checkbox"]:checked~aside .return p {
    display: block;
}

.show-menu {
    display: none;
}

.admin-panel {
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #eeeeee;
}

a {
    all: unset;
}

ul li {
    list-style: none;
}

main {
    width: 95%;
    transition: width 0.7s ease-in-out;
}

nav {
    background-color: transparent;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 0px 20px 0px 20px;
}

.user-image {
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

.user-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.logo-wrapper {
    box-sizing: border-box;
    height: 8vh;
    margin-left: 10px;
    color: #ffffff;
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 10px;
    font-family: 'Dancing Script', cursive;
    font-size: 1.5rem;
}

.app-name {
    display: none;
}

.logo {
    height: 70%;
}

.logo img {
    height: 100%;
}

aside {
    width: 5%;
    min-width: 90px;
    height: 100vh;
    background-color: #00aae4;
    box-sizing: border-box;
    padding: 0px 0px 0px 10px;
    transition: width 0.7s ease-in-out;
    color: white;
    overflow: hidden;
    position: relative;
}

aside ul {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    font-size: 1.3rem;
    font-weight: 700;
}

aside ul li {
    padding: 10px 0px 10px 15px;
    display: flex;
    align-items: center;
    gap: 30px;
    position: relative;
}

aside ul li p {
    display: none;

}

aside ul li:hover {
    background-color: #eeeeee;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    color: #00aae4;
    cursor: pointer;
}

aside ul li.active {
    background-color: #eeeeee;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    color: #00aae4;
    cursor: pointer;
}

aside ul li.active::before {
    content: '';
    width: 50px;
    height: 50px;
    position: absolute;
    background: transparent;
    right: 0;
    top: -50px;
    border-radius: 50%;
    box-shadow: 35px 35px 0 10px #eeeeee;
    pointer-events: none;
}

aside ul li.active::after {
    content: '';
    width: 50px;
    height: 50px;
    position: absolute;
    background: transparent;
    right: 0;
    bottom: -50px;
    border-radius: 50%;
    box-shadow: 35px -35px 0 10px #eeeeee;
    pointer-events: none;
}

aside ul li.active svg {
    fill: #00aae4;
}

aside ul li:hover:before {
    content: '';
    width: 50px;
    height: 50px;
    position: absolute;
    background: transparent;
    right: 0;
    top: -50px;
    border-radius: 50%;
    box-shadow: 35px 35px 0 10px #eeeeee;
    pointer-events: none;
}

aside ul li:hover:after {
    content: '';
    width: 50px;
    height: 50px;
    position: absolute;
    background: transparent;
    right: 0;
    bottom: -50px;
    border-radius: 50%;
    box-shadow: 35px -35px 0 10px #eeeeee;
    pointer-events: none;
}

aside ul li:hover svg {
    fill: #00aae4;
}

.main-admin {
    box-sizing: border-box;
    padding: 20px;
    height: 90vh;
}

.return {
    position: absolute;
    width: 100%;
    border-top: 2px solid white;
    display: flex;
    bottom: 0;
    left: 0;
    padding: 10px;
    padding-left: 25px;
    display: flex;
    align-items: center;
    gap: 30px;
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
}

.return:hover {
    background-color: red;
}

.return p {
    display: none;
}

@media (max-width: 900px) {
    aside {
        position: absolute;
        z-index: 2;
        display: none;
    }

    main {
        width: 100%;
    }

    input[type="checkbox"]:checked~aside {
        width: 100%;
        display: block;
    }

    input[type="checkbox"]:checked~main {
        width: 100%;
    }

    .logo-wrapper {
        justify-content: flex-end;
        padding-right: 20px;
    }

    .main-admin {
        padding: 0px;
    }
}
</style>