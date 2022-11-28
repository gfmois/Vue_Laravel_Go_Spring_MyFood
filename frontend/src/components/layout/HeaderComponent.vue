<script>
import { RouterLink } from 'vue-router';
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
            <!-- <v-icon name="bi-house-fill" hover="true" fill="white" scale="2.15"/> -->
            <v-icon name="gi-fork-knife-spoon" hover="true" animation="float" fill="white" scale="2"/>
            <RouterLink to="/calendar"><v-icon name="bi-calendar-fill" hover="true" animation="float" fill="white" scale="2"/></RouterLink>
            <RouterLink to="/admin"><v-icon name="fa-user" fill="white" hover="true" animation="float" scale="2" /></RouterLink>
        </div>
    </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
    nav {
        background-color: #00aae480;
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
        color: white;
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