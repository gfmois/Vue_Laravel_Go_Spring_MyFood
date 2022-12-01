<script>
import { jsPDF } from "jspdf";
import { useRoute } from "vue-router";
import reservasService from "../../services/client/ReservasService"

import('../../assets/fonts/dancing_script')

export default {
    props: {
        reserve_info: []
    },
    setup(props) {
        const currentRoute = useRoute();

        let done = true
        let inRoute = true;
        let url = "{nombre:Pepe,n_comensales:20,servicio:Cena,n_invitado:23434}"

        const doc = new jsPDF({
            orientation: "l",
            format: [180, 360],
        });

        const toDataUrl = (url, cb) => {
            let image = new Image()
            image.setAttribute('crossOrigin', 'annonymous')

            image.onload = function () {
                let canvas = document.createElement('canvas')
                canvas.width = 1920
                canvas.height = 1280

                let ctx = canvas.getContext('2d')
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                canvas.getContext('2d').drawImage(this, 0, 0)
                cb(canvas.toDataURL('image/jpeg'))
            }

            image.src = url;
        }

        const createPDF = async () => {
            let fromUrl = false;
            let obj = props.reserve_info || await reservasService.getReserva(currentRoute.params.id).then((data) => {
                fromUrl = true;
                return data.data
            });


            if (fromUrl) {
                obj = obj.map((e) => 
                        Object.keys(e).map((i) => {
                            return {
                                name: `${i[0].toUpperCase()}${i.slice(1)}`,
                                value: e[i]
                            }
                        })
                    ).flat()

                    console.log(obj);
            }

            Object.keys(obj).map((e) => {
                doc.setTextColor(0, 0, 0)
                doc.text(125, 70 + (e * 10), String(obj[e].value))
                doc.text(45, 70 + (e * 10), obj[e].name)
            });


            toDataUrl('http://localhost:3000/test', function (img) {
                doc.addImage(img, "baseURL", 0, 0)

                // Card
                doc.setFillColor(255, 255, 255)
                doc.rect(20, 20, 170, 125, 'F')

                // Title
                doc.setTextColor(0, 0, 0)
                doc.setFont("dancing", "italic")
                doc.text(95, 35, "MyFood")

                Object.keys(obj).map((e) => {
                    doc.setTextColor(0, 0, 0)
                    doc.text(125, 70 + (e * 10), String(obj[e].value))
                    doc.text(45, 70 + (e * 10), obj[e].name)
                })


                doc.save("reserva")
            })

        }

        return { createPDF, done, url, inRoute }

    },
    methods: {}
}
</script>


<template>
    <div class="loader" v-if="!done"></div>
    <div v-if="(done && inRoute)" class="qr-container">
        <vue-qrcode :value="asdfg" :options="{ width: 300 }"></vue-qrcode>
        <label @click="createPDF()"><v-icon name="hi-solid-document-download" animation="float" scale="2" /> Descargar
            PDF</label>
    </div>
    <div v-if="(done && inRoute)">
    </div>
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

.qr-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.qr-container label {
    cursor: pointer;
    padding: 10px;
    background-color: #75cc65;
    border-radius: 20px;
    display: flex;
    font-weight: 700;
    align-items: center;
}
</style>