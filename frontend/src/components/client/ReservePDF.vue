<script>
import { jsPDF } from "jspdf";
import('../../assets/fonts/dancing_script')

export default {
    props: {},
    setup() {
        const doc = new jsPDF({
            orientation: "l",
            format: [180, 360],
        });
        
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
            let obj = {
                nombre: "Moises",
                n_comensales: "280"
            }

            toDataUrl('http://192.168.9.194:3000/test', function(img) {
                doc.addImage(img, "baseURL", 0, 0)

                // Card
                doc.setFillColor(255, 255, 255, 255)
                doc.rect(20, 20, 170, 125, 'F')

                // Title
                doc.setTextColor(0, 0, 0)
                doc.setFont("dancing", "italic")
                doc.text(95, 35, "MyFood")

                Object.keys(obj).map((e, i) => {
                    doc.setTextColor(0, 0, 0)
                    doc.text(125, 70 + (i + 20), e )
                    doc.text(45, 70 + (i + 20), obj[e])
                })

                
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