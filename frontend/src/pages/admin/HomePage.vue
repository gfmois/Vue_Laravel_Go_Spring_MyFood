<script>
import { RouterLink } from 'vue-router'
</script>
<template>
<aside>
    <div class="logo-wrapper">
        <div class="logo">
            <img src="../../assets/MyFood.png">
        </div>
        <div class="app-name">
        <RouterLink to="/"><h1>MyFood</h1></RouterLink>
        </div>
    </div>
    <ul>
        <li>Hola</li>
        <li>Que tal</li>
    </ul>
</aside>    
<nav>
    <h1>Hola</h1>
    <h1>Adios</h1>
</nav>
</template>
<style>
#app > nav {
    display: none;
}
#app > footer {
    display: none;
}
main {
    width: 100vw;
    height: 100vh;
    display: flex;
}
nav {
    width: 80%;
    background-color: transparent;
}
aside {
    width: 20%;
    height: 100%;
    background-color: #00aae480;
    box-sizing: border-box;
    border: 1px solid black;
}

aside ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

</style>