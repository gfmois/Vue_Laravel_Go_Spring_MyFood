<script>
import { jsPDF } from "jspdf";
import base64 from "base-64"

export default {
    props: {},
    setup() {
        const doc = new jsPDF();
        
        const toDataUrl = (url, cb) => {
            let image = new Image()
            image.setAttribute('crossOrigin', 'annonymous')

            image.onload = function() {
                let canvas = document.createElement('canvas')
                canvas.width = 1920
                canvas.height = 1280

                let context = canvas.getContext('2d')
                context.fillStyle = "#fff";
                context.fillRect(0, 0, canvas.width, canvas.height)
                context.globalAlpha = 2.6;


                canvas.getContext('2d').drawImage(this, 0, 0)
                cb(canvas.toDataURL('image/jpeg'))
            }

            image.src = url;
        }

        const createPDF = () => {
            toDataUrl('http://localhost:3000/test', function(e) {
                doc.addImage(e, "baseURL", 0, 0)
                doc.save("reserva")
            })

        }

        return { createPDF }
        
    }
}
</script>
<template>
<div class="loader" :click="createPDF()" v-if="!done"></div>
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