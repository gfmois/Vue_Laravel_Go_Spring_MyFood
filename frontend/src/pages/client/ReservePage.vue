<script>
import { DatePicker, CustomInput } from "../../components";
import { ReservePDF } from "../../components/client";

export default {
  data: () => ({
    date: null,
    step: 0,
    steps: {
      contact: {
        name: "Información Reserva",
        children: [
          {
            name: "Comensales",
            type: "number",
            required: true,
            value: "",
            min: 1,
          },
          {
            name: "Servicio",
            tag: "select",
            value: "",
            children: [
              {
                name: "Almuerzo",
                tag: "option",
              },
              {
                name: "Comida",
                tag: "option",
              },
              {
                name: "Cena",
                tag: "option",
              },
            ],
          },
        ],
      },
      date: {
        name: "Fecha de Reserva",
        value: "",
      },
      confirmation: {
        name: "Confirmación",
        children: []
      },
    },
  }),
  computed: {
    stepperProgress() {
      return (100 / Object.keys(this.steps).length) * this.step + "%";
    },
    getValues() {
      this.steps.confirmation.children = Object.keys(this.steps)
        .map((e) => (e != "confirmation" ? this.steps[e] : null))
        .filter((i) => i != null)
        .map((j) =>
          j.children != null
            ? j.children.map((k) => {
              return { name: k.name, value: k.value, disabled: true };
            })
            : { ...j, disabled: true }
        )
        .flat().map((l) => { 
          return { 
            ...l, 
            value: l.value == this.steps.date.value 
              ? new Date(l.value).toLocaleDateString() 
              : l.value 
            }
          })

      return
    },
  },
  components: {
    DatePicker,
    CustomInput,
    ReservePDF
  },
};
</script>

<template>
  <div class="wrapper-stepper">
    <div class="stepper">
      <div class="stepper-progress">
        <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
      </div>

      <div class="stepper-item" v-for="item in Object.keys(steps).length"
        :class="{ current: step == item - 1, success: step >= item }" :key="item">
        <div class="stepper-item-counter">
          <img class="icon-success"
            src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png" alt="" />
          <span class="number">
            {{ item }}
          </span>
        </div>
        <span class="stepper-item-title">
          {{ steps[Object.keys(steps)[item - 1]].name }}
        </span>
      </div>
    </div>

    <div class="stepper-content" v-for="(step_collection, step_name) in steps" :key="step_collection">
      <div class="stepper-pane" v-if="step == Object.keys(steps).findIndex((i) => i == step_name)">
        {{ getValues }}
        <div class="middle-input" v-if="step_name != 'date'">
          <div class="lf-input">
            <div class="inputs">
              <CustomInput :step_collection="step_collection" />
            </div>
          </div>
          <div class="rg-img">
            <img src="../../assets/GIF/chef.gif" alt="" v-if="step_name == 'contact'">
            <ReservePDF v-if="step_name == 'confirmation'" :reserve_info="steps.confirmation.children" />
          </div>
        </div>
        <div class="middle-input" v-if="step == Object.keys(steps).findIndex((i) => i == 'date')">
          <div class="lf-input">
            <DatePicker :params="steps.contact.children" v-model="steps.date.value" />
          </div>
          <div class="rg-img">
            <img src="../../assets/IMG/istockphoto-675913544-612x612.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="btn" @click="step--" :disabled="step == 0">
        Anterior
      </button>
      <button class="btn btn--green-1" @click="step++" :disabled="step == Object.keys(steps).length - 1">
        Siguiente
      </button>
    </div>
  </div>
</template>

<style>
.middle-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 70%;
}


.dp__main {
  height: 100%;
  width: 100%;
  position: relative;
}

.dp__calendar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dp__calendar_row {
  gap: 10px;
}

.dp_main:nth-child(2) {
  width: 100%;
  height: 100%;
}

.dp__menu {
  width: 100%;
}

.dp__calendar_wrap {
  margin-top: 5%;
}

.lf-input {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rg-img {
  width: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.dp__calendar_header {
  gap: 10px;
}

.rg-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.tx-green-1 {
  color: #75cc65;
  font-weight: 600;
}

.wrapper-stepper {
  padding: 60px;
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  margin-bottom: 35px;
}

.stepper-progress {
  position: absolute;
  background-color: #c5c5c5;
  height: 2px;
  z-index: -1;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.stepper-progress-bar {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: #75cc65;
  transition: all 500ms ease;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #c5c5c5;
  transition: all 500ms ease;
}

.stepper-item-counter {
  height: 68px;
  width: 68px;
  display: grid;
  place-items: center;
  background-color: #fff;
  border-radius: 100%;
  border: 2px solid #c5c5c5;
  position: relative;
  margin-bottom: 10px;
}

.stepper-item-counter .icon-success {
  position: absolute;
  opacity: 0;
  transform: scale(0);
  width: 24px;
  transition: all 500ms ease;
}

.stepper-item-counter .number {
  font-size: 22px;
  transition: all 500ms ease;
}

.stepper-item-title {
  position: absolute;
  font-size: 14px;
  bottom: -24px;
}

.stepper-item.success .stepper-item-counter {
  border-color: #75cc65;
  background-color: #c8ebc1;
  color: #fff;
  font-weight: 600;
}

.stepper-item.success .stepper-item-counter .icon-success {
  opacity: 1;
  transform: scale(1);
}

.stepper-item.success .stepper-item-counter .number {
  opacity: 0;
  transform: scale(0);
}

.stepper-item.success .stepper-item-title {
  color: #75cc65;
}

.stepper-item.current .stepper-item-counter {
  border-color: #75cc65;
  background-color: #75cc65;
  color: #fff;
  font-weight: 600;
}

.stepper-item.current .stepper-item-title {
  color: #818181;
}

.stepper-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stepper-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  text-align: center;
  width: 60%;
  height: 45vh;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.09);
  margin: 40px 0;
}

.controls {
  display: flex;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  border: 1px solid;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.5;
  transition: all 150ms;
  border-radius: 4px;
  width: fit-content;
  font-size: 0.75rem;
  color: #333;
  background-color: #f0f0f0;
  border-color: #f0f0f0;
  border: 1px #75cc65 solid;
}

.btn:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.btn--green-1 {
  background-color: #75cc65;
  border-color: #75cc65;
  color: #fff;
  margin-left: auto;
}

.confirm {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
