<script>
export default {
    data: () => ({
        allergens: [
            {
                name: "Gluten",
                icon: "gi-wheat",
                color: "#f89358",
                active: false,
            },
            {
                name: "Crustáceos",
                icon: "gi-crab",
                color: "#00a2dc",
                active: false,
            },
            {
                name: "Huevos",
                icon: "gi-egg-clutch",
                color: "#ffad4e",
                active: false
            },
            {
                name: "Pescado",
                icon: "fa-fish",
                color: "#304892",
                active: false
            },
            {
                name: "Cacahuetes",
                icon: "gi-peanut",
                color: "#ce8e67",
                active: false
            },
            {
                name: "Lácteos",
                icon: "gi-milk-carton",
                color: "#875435",
                active: false
            },
            {
                name: "Moluscos",
                icon: "gi-snail",
                color: "#00cadb",
                active: false
            }
        ]
    }),
    methods: {
        onChange() {
            let allergensOut = []
            this.allergens.map(allergen => allergen.active ? allergensOut.push(allergen.name) : null)
            this.$emit('allergens',allergensOut)
        }   
    }
}
</script>
<template>
    <div class="container">
        <div v-for="allergen in allergens" :style="{ 'background-color': allergen.color }"
            :class="{ active: allergen.active }" @click="((allergen.active = !allergen.active),onChange())">
            <v-icon :name="allergen.icon" scale="2" fill="white" />
            <p>{{ allergen.name }}</p>
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
    padding: 10px;
    min-width: 100px;
    min-height: 100px;
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