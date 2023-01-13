<script>
import Slider from '@vueform/slider'
import Multiselect from '@vueform/multiselect'
export default {
    props:{
        filters: []
    },
    data() {
        return this.filters
    },
    components: {
        Slider,
        Multiselect
    }
}
</script>
<template>
    <div class="main-filters">
        <div class="filters-container">
            <div class="main-filter" v-for="filter in filters">    
            <div class="filter-item" v-if="filter.type == 'Multiselect'">
                <p>{{ filter.name }}</p>
                <Multiselect class="multi-select" v-model="filter.value" mode="tags" :searchable="filter.searchable" :options="filter.options"/>
            </div>
            <div class="filter-item" v-if="filter.type == 'Radiobuttons'">
                <p>{{ filter.name }}</p>
                <div class="radio" v-for="(option,index) in filter.options">
                    <input type="radio" :id="index" name="order" :value="option.value" :checked="filter.value == option.value" v-model="filter.value">
                    <label :for="index">{{ option.name }}</label>
                </div>
            </div>
            <div class="filter-item" v-if="filter.type == 'Slider'">
                <p>Rango de precios</p>
                <Slider class="slider" tooltipPosition="bottom" v-model="filter.value" :max="filter.max" :merge="1" :format="filter.format"/>
            </div>
        </div>
        </div>
    </div>
</template>
<style src="@vueform/slider/themes/default.css"/>
<style src="@vueform/multiselect/themes/default.css"/>
<style>
.main-filters {
    box-sizing: border-box;
}
.multi-select {
    --ms-tag-bg: orange;
    --ms-tag-color: white;
    --ms-tag-radius: 9999px;
    --ms-tag-font-weight: 400;
}

.slider {
    --slider-connect-bg: orange;
    --slider-tooltip-bg: orange;
    --slider-handle-ring-color: orange;
}

.main-filters {
    width: 100%;
    height: 100%;
    position: relative;
    color: orange;
}

.filters-container {
    position: sticky;
    top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
}

.main-filter {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
}

.filter-item {
    box-sizing: border-box;
    font-size: 1.3rem;
    width: 90%;
    display: flex;
    gap: 20px;
    flex-direction: column;

}
.radio {
    padding-left: 20px;
    font-size: 1.1rem;
}
</style>