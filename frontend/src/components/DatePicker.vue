<template>
  <v-dpicker
    inline
    autoApply
    locale="es"
    :enableTimePicker="false"
    :disabledWeekDays="[0]"
    :minDate="new Date()"
    :disabledDates="disabledDates"
  ></v-dpicker>
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
    setup() {
        const disabledDates = computed(() => {
            // const today = new Date();
            
            // const tomorrow = new Date(today)
            // tomorrow.setDate(tomorrow.getDate() + 1)
            
            // const afterTomorrow = new Date(tomorrow);
            // afterTomorrow.setDate(tomorrow.getDate() + 1);
            
            // return [tomorrow, afterTomorrow]
        })
        
        return {
            disabledDates,
        }
    }
}
</script>

<style></style>
