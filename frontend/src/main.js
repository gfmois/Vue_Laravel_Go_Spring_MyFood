import { createApp } from 'vue'
import store from "./store"
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as VIcons from "oh-vue-icons/icons";
import VueQrcode from '@chenfengyuan/vue-qrcode';
import 'vue-toast-notification/dist/theme-sugar.css';

//* Datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const Vi = Object.values({ ...VIcons })
addIcons(...Vi);

const app = createApp(App)

app.use(router)
app.use(store)

app.component('v-icon', OhVueIcon)
app.component('v-dpicker', Datepicker);
app.component(VueQrcode.name, VueQrcode);

app.mount('#app')
