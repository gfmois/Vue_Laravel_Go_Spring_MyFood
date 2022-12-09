<script>
import { jsPDF } from "jspdf";
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import reservasService from "../../services/client/ReservasService";
import secret from "../../secret";
import { useCreateReserve } from "../../composables/reservas/useReservas";

import("../../assets/fonts/dancing_script");

export default {
  props: {
    reserve_info: [],
    mini_style: false,
  },
  setup(props) {
    const currentRoute = useRoute();

    const done = ref(false);
    let url = `${secret.LOCALHOST}/reserve`;

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

      console.log(reactive(useCreateReserve(f_obj)));
      url += "";
      done.value = true;
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

    onMounted(() => {
      console.log(props.reserve_info);
      if (Object.keys(currentRoute.params).includes("id") == true) {
        createPDF();
      }
    });

    return {
      createPDF,
      done,
      url,
      mini_style: props.mini_style,
      createReserve,
    };
  },
};
</script>

<template>
  <!-- Confirm Reserve -->
  <div class="confirm" v-if="!done">
    <div class="loader"></div>
    <div class="container confirm">
      <label @click="createReserve()">
        <v-icon name="gi-knife-fork" animation="float" scale="2" />
        Confirmar Reserva
      </label>
    </div>
  </div>

  <!-- Download PDF with QR -->
  <div v-if="!mini_style && done" class="container">
    <vue-qrcode :value="url" :options="{ width: 300 }"></vue-qrcode>
    <label @click="createPDF()">
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
