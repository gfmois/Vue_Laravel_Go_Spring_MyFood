<script>
export default {
    props: {
        data: [],
        url: ""
    },
    setup() {
        let input
        return { input }
    }


}
</script>
<template>
    <div class="main-search">
        <div class="find-image">
            <v-icon name="io-search" scale="1.5"/>
        </div>
        <div class="search-input">
            <input type="text" list="input_search" v-model="input" @input="$emit('input_value', input)" @keydown.enter="$router.replace(`/${url}/${input}`)" placeholder="Busca un producto">
            <datalist id="input_search">
                <option v-for="item in data" :value="item.slug">{{ item.nombre }}</option>
            </datalist>
        </div>
        
    </div>
</template>
<style scoped>
.main-search {
    box-sizing: border-box;
    background-color: white;
    border-radius: 50px;
    display: flex;
    width: 30vw;
    height: 40px;
    align-items: center;
    gap: 10px;
    padding-left: 5px;
    padding-right: 20px;
}
.find-image {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-input {
    /* background-color: red; */
    width: 100%;
    height: 70%;
    box-sizing: border-box;
}

.search-input input {
    border: none;
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
}

.search-input input:focus {
    outline: none;
    border-bottom: 1px solid black;
    line-height:65px;
}
</style>