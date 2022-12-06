<script>
import { jsPDF } from "jspdf";
import { useRoute } from "vue-router";
import reservasService from "../../services/client/ReservasService";
import secret from "../../secret"

import("../../assets/fonts/dancing_script");

export default {
  props: {
    reserve_info: [],
    mini_style: false,
  },
  setup(props) {
    const currentRoute = useRoute();

    let done = false;
    let inRoute = true;
    let url = `${location.href}`;

    const doc = new jsPDF({
      orientation: "l",
      format: [180, 360],
    });

    const awaitReserveInfo = () => {

    }

    const toDataUrl = (url, cb) => {
      let image = new Image();
      image.setAttribute("crossOrigin", "annonymous");

      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = 1920;
        canvas.height = 1280;

        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.getContext("2d").drawImage(this, 0, 0);
        cb(canvas.toDataURL("image/jpeg"));
      };

      image.src = url;
    };

    const createPDF = async () => {
      let fromUrl = false;
      let obj =
        props.reserve_info ||
        (await reservasService
          .getReserva(currentRoute.params.id)
          .then((data) => {
            fromUrl = true;
            return data.data;
          }));

      if (fromUrl) {
        obj = obj
          .map((e) =>
            Object.keys(e).map((i) => {
              return {
                name: `${i[0].toUpperCase()}${i.slice(1)}`,
                value: e[i],
              };
            })
          )
          .flat();
      }

      Object.keys(obj).map((e) => {
        doc.setTextColor(0, 0, 0);
        doc.text(125, 70 + e * 10, String(obj[e].value));
        doc.text(45, 70 + e * 10, obj[e].name);
      });

      toDataUrl(`${secret.CLIENT_SERVER}/reservas/image`, function (img) {
        doc.addImage(img, "baseURL", 0, 0);

        // Card
        doc.setFillColor(255, 255, 255);
        doc.rect(20, 20, 170, 125, "F");

        // Title
        doc.setTextColor(0, 0, 0);
        doc.setFont("dancing", "italic");
        doc.text(95, 35, "MyFood");

        Object.keys(obj).map((e) => {
          doc.setTextColor(0, 0, 0);
          doc.text(125, 70 + e * 10, String(obj[e].value));
          doc.text(45, 70 + e * 10, obj[e].name);
        });

        doc.save("reserva");
      });
    };

    return { createPDF, done, url, inRoute, mini: props.mini };
  },
  methods: {},
};
</script>

<template>
  <div class="confirm">
    <div class="loader" v-if="!done"></div>
    <div class="container confirm">
        <label>
            <v-icon name="gi-knife-fork" animation="float" scale="2" />
            Confirmar Reserva
        </label>
    </div>
  </div>
  <div v-if="done && inRoute && !mini_style" class="container">
    <vue-qrcode :value="url" @ready="awaitReserveInfo()" :options="{ width: 300 }"></vue-qrcode>
    <label @click="createPDF()">
        <v-icon name="hi-solid-document-download" animation="float" scale="2" />
        Descargar PDF
    </label>
  </div>
  <div v-if="done && inRoute && mini_style">
    {{ createPDF() }}
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
  content: "";
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
    transform: scale(-0.75);
    opacity: 0;
  }
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.container label {
  cursor: pointer;
  padding: 10px;
  background-color: #75cc65;
  border-radius: 20px;
  display: flex;
  font-weight: 700;
  align-items: center;
}

.container.confirm {
    margin-top: 65px;
  }
</style>
