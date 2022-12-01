<script>
import { computed, reactive, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import Constant from '../Constant'

export default {
    props: {
      params: Object
    },
    setup(props) {
      const date = ref(new Date());
        const store = useStore();
        const state = reactive({
          holidaysList: computed(() => store.getters[`reservas/${Constant.GET_HOLIDAYS}`])
        })

        store.dispatch(`reservas/${Constant.GET_HOLIDAYS}`, props.params)

        return { state, date }
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
    :minDate="date"
    :disabledDates="state.holidaysList"
  ></v-dpicker>
</template>

<style></style>
