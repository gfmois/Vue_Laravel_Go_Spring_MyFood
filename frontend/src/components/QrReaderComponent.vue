<script>
import QrScanner from 'qr-scanner';
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const qr_reader = ref(null)
        const data = ref()
        const qrScanner = ref()
        const loadScanner = () => {
            qrScanner.value = new QrScanner(
                qr_reader.value,
                result => data.value = result,
                {
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    maxScansPerSecond: 10,
                }
            )
            qrScanner.value.start()
        }

        const closeCamera = () => {
            qrScanner.value.stop()
        }

        onMounted(() => {
            loadScanner()
        })

        return { loadScanner, qr_reader, data, closeCamera }
    },
}

</script>
<template>
    {{ data }}
    <div class="video">
        <video ref="qr_reader"></video>
         <v-icon class="close-button" scale="3" name="io-close-circle" @click="$emit('open_close', false), closeCamera()"></v-icon>
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