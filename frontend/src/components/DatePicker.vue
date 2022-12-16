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

<style></style>
