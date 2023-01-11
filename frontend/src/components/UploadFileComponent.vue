<script>
import { ref } from 'vue';
import secret from '../secret';
export default {
    props: {
        urlImage: String
    },  
    setup(props) {
        let d_enter=false
        let empty=true
        let url=ref(null)
        if (props.urlImage) {
            empty = false
            url = `${secret.ADMIN_SERVER}/public/${props.urlImage}`
        }
        return { d_enter, empty, url }
    },  
    methods: {
        onChange() {
            const file = this.$refs.file.files[0]
            this.empty = false
            this.url = URL.createObjectURL(file);
            this.$emit('uploadImage',file)
        },
        focusInput() {
            this.$refs.file.click()
        },
        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.d_enter = false
            this.onChange();
        }
    }

}
</script>
<template>
    <div class="upload-container" @dragover="d_enter = true" @dragleave="d_enter = false" :class="{dragenter: d_enter}" @drop="drop">
        <input type="file" ref="file" id="file" @change="onChange" />
        <label for="file" class="upload-file" :class="{ d_none: !empty }" >
             <p>Icon</p><v-icon name="fa-file-upload" scale="7"/>
            <label><strong>Elige un archivo</strong><span class="box__dragndrop"> o sueltalo aquí</span>.</label>
        </label>
        <div :class="{ d_none: empty }" @click="focusInput">
            <img :src="url">
        </div>
    </div>
</template>
<style scoped>
.upload-container {
    background-color: lightblue;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.upload-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: center;
}

.upload-file {
    width: 100%;
    height: 100%;
    border: 3px dashed gray;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
    font-size: 1.3rem;
}

#file {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
}

.dragenter {
    padding: 15px;
    background-color: lightgray;
}

.d_none {
    display: none;
}
</style>