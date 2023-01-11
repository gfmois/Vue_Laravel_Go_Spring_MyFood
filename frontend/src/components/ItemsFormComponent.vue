<script>
export default {
    props: {
        items: Object
    }
}
</script>
<template>
    <div class="container">
        <div v-for="item in items" :style="{ 'background-color': item.color }"
            :class="{ active: item.active }" @click="item.active = !item.active">
             <p>Icon</p><v-icon :name="item.icon" scale="2" fill="white" />
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
}

.container>div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    padding: 10px;
    border-radius: 50%;
    color: white;
    cursor: pointer;
}

.container>div:hover,
.container>div.active {
    border: 5px solid black;
    box-sizing: border-box;
}
</style>