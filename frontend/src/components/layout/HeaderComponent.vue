<script setup>
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import Constant from '../../Constant';
const store = useStore()
const hasUser = ref(store.state.auth.hasUser)

watch(store.state.auth.hasUser, (newvalue) => {
    console.log(newvalue);
})
</script>
<template>
    <nav>
        <div class="logo-wrapper">
            <div class="logo">
                <img src="../../assets/MyFood.png">
            </div>
            <div class="app-name">
                <RouterLink to="/"><h1>MyFood</h1></RouterLink>
            </div>
        </div>
        <div class="routes">
            <!--  <p>Icon</p><v-icon name="bi-house-fill" hover="true" fill="white" scale="2.15"/> -->
            <RouterLink to="/pedidos"> <p>Icon</p><v-icon name="gi-fork-knife-spoon" hover="true" animation="float" fill="white" scale="2"/></RouterLink>
            <RouterLink to="/reserve"> <p>Icon</p><v-icon name="bi-calendar-fill" hover="true" animation="float" fill="white" scale="2"/></RouterLink>
            <RouterLink to="/admin" v-if="hasUser == false"> <p>Icon</p><v-icon name="fa-user" fill="white" hover="true" animation="float" scale="2" /></RouterLink>
            <p v-if="hasUser">Hola</p>
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
        gap: 20px;
    }
    .routes * {
        cursor: pointer;
    }


</style>