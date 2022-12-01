<script>
export default {
    setup() {
        let done = true
        let url = "{nombre:Pepe,n_comensales:20,servicio:Cena,n_invitado:23434}"
        return {done,url}
    },
}
</script>
<template>
<div class="loader" v-if="!done"></div>
<vue-qrcode :value="url" :options="{ width: 300 }" v-if="done"></vue-qrcode>
</template>
<style>
.loader {
    border: 0 solid transparent;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    transform: scale(2);
   }
   
   .loader::before,
   .loader::after {
    box-sizing: border-box;
    content: '';
    border: 10px solid #75cc65;
    border-radius: 50%;
    width: inherit;
    height: inherit;
    right: 0;
    position: absolute;
    animation: loader 2s linear infinite;
    opacity: 0;
   }
   
   .loader::before {
    animation-delay: 1s;
   }
   
   @keyframes loader {
    0% {
     transform: scale(1);
     opacity: 0;
    }
   
    50% {
     opacity: 1;
    }
   
    100% {
     transform: scale(-.75);
     opacity: 0;
    }
   }
</style>