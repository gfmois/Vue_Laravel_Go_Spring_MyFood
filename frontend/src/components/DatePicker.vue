<script>
import { reactive, ref } from "@vue/reactivity";
import { useGetHolidays } from "../composables/reservas/useReservas";

export default {
  props: {
    params: Object,
  },
  setup(props, context) {
    const date = ref(new Date());
    const holidays = reactive(useGetHolidays(props.params).holidays);

    return { holidays, date };
  },
  watch: {
    holidays() {
      setTimeout(() => this.$emit('loading', false), 250)
    }
  }
};
</script>

<template>
  <v-dpicker
    inline
    autoApply
    locale="es"
    :enableTimePicker="false"
    :disabledWeekDays="[0]"
    :minDate="date"
    :disabledDates="holidays"
  ></v-dpicker>
</template>

<style>

.dp__main, .dp__menu, .dp__menu>div, .dp__instance_calendar, .dp__instance_calendar>div:first-child, .dp__instance_calendar>div>div, .dp__calendar>div {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;

}

.dp__month_year_row {
  width: 100%;
  height: 10%;
  box-sizing: border-box;
}
.dp__calendar {
  width: 100%;
  height: 90%;
  box-sizing: border-box;
}

.dp__calendar_header {
  width: 100%;
}
.dp__calendar_wrap {
  height: 100%;
  margin-top: 0!important;
  box-sizing: border-box;
}

.dp__calendar .dp__calendar {
  height: 95%;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

}
.dp__calendar_item {
  display: flex;
  justify-content: center;
}

</style>
