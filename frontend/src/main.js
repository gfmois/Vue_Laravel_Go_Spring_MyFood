import { createApp } from 'vue'
import store from "./store"
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as VIcons from "oh-vue-icons/icons"
// import {MdExittoappTwotone,BiBox2Fill,BiHouseFill,GiForkKnifeSpoon, BiCalendarFill,FaUser,CoHamburgerMenu} from 'oh-vue-icons/icons';

//* Datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const Vi = Object.values({ ...VIcons })
addIcons(...Vi);
// addIcons(MdExittoappTwotone,BiBox2Fill,BiHouseFill,GiForkKnifeSpoon,BiCalendarFill,FaUser,CoHamburgerMenu)

const app = createApp(App)

app.use(router)
app.use(store)

app.component('v-icon', OhVueIcon)
app.component('v-dpicker', Datepicker);

app.mount('#app')
