<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import { useGetUserProfile } from '../../composables/clientes/useClientes';
import { useSearchProducts } from '../../composables/productos/useProductos';
import { SearchList } from '..';

const store = useStore()
const hasUser = computed(() => store.state.auth.hasUser)
const isAdmin = computed(() => store.state.auth.isAdmin)
const userInfo = ref({})
const user_dropdown = ref([
    {name: "Mi perfil", src: "/perfil", icon: "fa-user"},
    {name: "Mis pedidos", src: "/perfil/pedidos", icon: "bi-basket2-fill"},
    {name: "Mis reservas", src: "/perfil/reservas", icon: "md-daterange"}
])
const search_products = ref()
const input_value = ref()

watch(input_value, (val) => {
    if (val.length > 2) {
        watch(useSearchProducts(val).products,(products) => {
            search_products.value = products
        })
    }
})

function getUserInfo() {
    watch(useGetUserProfile().client, (userProfile) => {
        userInfo.value = userProfile
    })
}

if(hasUser.value) {
    getUserInfo()
}

if (isAdmin.value) {
    user_dropdown.value.push({name: "Administrar aplicación", src: "/admin", icon: "md-adminpanelsettings-sharp"})
}

watch(hasUser,() => {
    if (hasUser.value) {
        getUserInfo()
    }
})

watch(isAdmin,() => {
    if (isAdmin.value) {
        user_dropdown.value.push({name: "Administrar aplicación", src: "/admin", icon: "md-adminpanelsettings-sharp"})
    } else {
        user_dropdown.value.pop()
    }
})
</script>
<template>
    <nav>
        <div class="logo-wrapper">
            <div class="logo">
                <img src="../../assets/MyFood.png" @click="$router.replace('/')">
            </div>
            <div class="app-name">
                <RouterLink to="/"><h1>MyFood</h1></RouterLink>
            </div>
        </div>
        <div class="search">
            <SearchList :data="search_products" :url="'productos'" @input_value="input_value = $event"/>
        </div>
        <div class="routes">
            <!--   <v-icon name="bi-house-fill" hover="true" fill="white" scale="2.15"/> -->
            <RouterLink to="/pedidos"><v-icon name="gi-fork-knife-spoon" hover="true" animation="float" fill="white" scale="2"/></RouterLink>
            <RouterLink to="/reserve"><v-icon name="bi-calendar-fill" hover="true" animation="float" fill="white" scale="2"/></RouterLink>
            <RouterLink to="/auth" v-if="hasUser == false"><v-icon name="fa-user" fill="white" hover="true" animation="float" scale="2" /></RouterLink>
            <div v-if="hasUser" class="user-profile">
                <img :src="userInfo.avatar">
                <div class="dropdown">
                    <div class="hover-dropdown"></div>
                    <div class="dropdown-item" v-for="item in user_dropdown">
                        <v-icon :name="item.icon" scale="1.3"/>
                        <p @click="$router.push(item.src)">{{ item.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
    nav {
        background-color: #E8C39e;
        height: 8vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px 0px 20px;
    }
    a {
        all: unset;
    }
    .logo-wrapper {
        height: 100%;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Dancing Script', cursive;
        font-size: 1.5rem;
    }
    .logo {
        height: 70%;
    }
    img {
        height: 100%;
    }
    .routes {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .routes * {
        cursor: pointer;
    }
    .user-profile {
        /* background-color: red; */
        width: 35px;
        height: 35px;
        position: relative;
        
    }
    .user-profile img {
        width: 100%;
        height: 100%;
    }
    .user-profile .dropdown {        
        width: 220px;
        display: none;
        position: absolute;
        background-color: white;
        border-radius: 10px;
        box-sizing: border-box;
        z-index: 2;
        right: 0;

    }

    .hover-dropdown {
        position: absolute;
        width: 40px;
        right: 0;
        height: 200px;
        bottom: 0;
        z-index: 0;
    }
    .user-profile:hover .dropdown, .user-profile:has(.hover-dropdown:hover) .dropdown, .dropdown:hover {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .dropdown-item {
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        justify-content: flex-start;
        gap: 10px;
        align-items: center;
    }
    .dropdown-item:hover{
        background-color: lightgrey;
    }

    .search {
        /* background-color: red; */
    }

    @media (max-width: 750px) {
    .app-name {
        display: none;
    }
    }


</style>