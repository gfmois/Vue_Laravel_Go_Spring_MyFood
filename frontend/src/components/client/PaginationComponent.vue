<script>
export default {
    props: {
        n_pages: Number,
        actual_page: Number
    }

}
</script>
<template>
    <div class="pages">
        <div class="page" v-for="page in n_pages" :class="{'actual-page': page == actual_page}" @click="$emit('change_page',page)">
            {{ page }}
        </div>
    </div>
</template>
<style scoped>
.pages {
    display: flex;
    background-color: orange;
    border-radius: 5px;
    gap: 10px;
    padding: 10px;
    margin: 10px;
    box-sizing: border-box;

}

.page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
    cursor: pointer;
    color: orange;
    border-radius: 5px;
    box-sizing: border-box;
    border: 2px solid white;
}

.actual-page, .page:hover {
    box-sizing: border-box;
    background-color: orange;
    color: white;
}
</style>