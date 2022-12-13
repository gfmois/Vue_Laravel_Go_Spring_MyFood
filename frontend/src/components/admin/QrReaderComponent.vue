<script>
import QrScanner from "qr-scanner"
export default {
    methods: {
        loadScanner() {
            console.log(this.$refs.qr_reader);
        }
    }
}
</script>
<template>
<div class="video">
    <video ref="qr_reader"></video>
    <v-icon class="close-button" name="io-close-circle" scale="3" @click="$emit('open_close',false)"/>
</div>
</template>

<style scoped>
.video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
}
video {
    width: 100vw;
    height: 100vh;
}
.close-button {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
}

</style>