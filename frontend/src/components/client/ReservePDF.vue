<script>
import { jsPDF } from "jspdf";
import { onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import reservasService from "../../services/client/ReservasService";
import secret from "../../secret";
import { useCreateReserve } from "../../composables/reservas/useReservas";
import QRCode from "qrcode";

import("../../assets/fonts/dancing_script");

export default {
  props: {
    reserve_info: [],
  },
  setup(props) {
    const reserveID = ref();
    const currentRoute = useRoute();
    const done = ref(false);
    const url = ref(`${secret.LOCALHOST}/reserve/`);
    const mini = ref(false);
    const inRoute = ref(false);

    const doc = new jsPDF({
      orientation: "l",
      format: [180, 360],
    });

    const createReserve = () => {
      let obj = props.reserve_info;
      let f_obj = {};
      let obj_mapped = obj
        .map((i) => Object.values(i))
        .map((v) => {
          return { key: v[0].toLowerCase().split(" ")[0], value: v[1] };
        });

      f_obj["n_" + obj_mapped[0].key] = obj_mapped[0].value;
      f_obj[obj_mapped[1].key] = obj_mapped[1].value;
      f_obj[obj_mapped[2].key] = obj_mapped[2].value;

      reserveID.value = useCreateReserve(f_obj);

      watchEffect(() => {
        url.value += `${reserveID.value.reservaID}`;
        done.value = true;
      });

      return;
    };

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

    const qrToDataURL = async (text) => {
      try {
        return await QRCode.toDataURL(text);
      } catch (err) {
        console.error(err);
      }
    };

    const createPDF = async () => {
      let fromUrl = false;
      let obj =
        props.reserve_info ||
        (await reservasService
          .getPDFReserva(currentRoute.params.id)
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

        // Qr
        const vl = qrToDataURL(`${secret.LOCALHOST}/admin/reservas/${currentRoute.params.id}`)
        vl.then((d) => {
          doc.addImage(d, "baseURL", 240, 45, 80, 80)
        })

        // Title
        doc.setTextColor(0, 0, 0);
        doc.setFont("dancing", "italic");
        doc.text(95, 35, "MyFood");

        Object.keys(obj).map((e) => {
          doc.setTextColor(0, 0, 0);
          doc.text(125, 70 + e * 10, String(obj[e].value));
          doc.text(45, 70 + e * 10, obj[e].name);
        });

        setTimeout(() => doc.save("reserva"), 1000)
      });
    };

    onMounted(() => {
      if (Object.keys(currentRoute.params).includes("id")) {
        mini.value = true;
        inRoute.value = true;
        createPDF();
      }
    });

    return {
      createPDF,
      done,
      url,
      mini,
      createReserve,
      inRoute,
    };
  },
};
</script>

<template>
  <!-- Confirm Reserve -->
  <div class="confirm" v-if="!done && !mini">
    <div class="loader"></div>
    <div class="confirm-container confirm">
      <label @click="createReserve()">
         <v-icon name="gi-knife-fork" animation="float" scale="2" />
        Confirmar Reserva
      </label>
    </div>
  </div>

  <!-- Download PDF with QR -->
<<<<<<< HEAD
  <div :class="{ 'centered-div': mini }" class="confirm-container">
    <vue-qrcode v-if="done && !inRoute" :value="url" :options="{ width: 300 }"></vue-qrcode>
    <p class="text-pdf" v-if="mini && inRoute">Si la descarga no ha iniciado automáticamente pulse en el botón de descargar PDF.</p>
=======
  <div :class="{ 'centered-div': mini }" class="container">
    <vue-qrcode
      v-if="done && !inRoute"
      :value="url"
      :options="{ width: 300 }"
    ></vue-qrcode>
    <p class="text-pdf" v-if="mini && inRoute">
      Si la descarga no ha iniciado automáticamente pulse en el botón de
      descargar PDF.
    </p>
>>>>>>> mois-dev
    <label v-if="done || inRoute" @click="createPDF()">
       <v-icon name="hi-solid-document-download" animation="float" scale="2" />
      Descargar PDF
    </label>
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

.centered-div {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 35%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
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

.confirm-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.confirm-container label {
  margin-top: 20px;
  cursor: pointer;
  padding: 10px;
  background-color: #75cc65;
  border-radius: 20px;
  display: flex;
  font-weight: 700;
  align-items: center;
}

.confirm-container.confirm {
  margin-top: 65px;
}

@media (max-width: 1200px) {
  .loader {
    display: none;
  }
  .confirm {
    margin-top: 0px !important;
  }
}
</style>
