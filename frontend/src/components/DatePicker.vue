<script>
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import Constant from '../Constant'

export default {
    setup() {
        const store = useStore();
        store.dispatch(`reservas/${Constant.GET_HOLIDAYS}`)

        const state = reactive({
          holidaysList: computed(() => store.getters[`reservas/${Constant.GET_HOLIDAYS}`])
        })

        console.log("Datepicker", JSON.stringify(state.holidaysList));


        return { state }
    }
}
</script>

<template>
  <v-dpicker
    inline
    autoApply
    locale="es"
    :enableTimePicker="false"
    :disabledWeekDays="[0]"
    :minDate="new Date()"
    :disabledDates="state.holidaysList"
  ></v-dpicker>
</template>

<style></style>
