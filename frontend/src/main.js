import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as VIcons from "oh-vue-icons/icons"
// import {MdExittoappTwotone,BiBox2Fill,BiHouseFill,GiForkKnifeSpoon, BiCalendarFill,FaUser,CoHamburgerMenu} from 'oh-vue-icons/icons';

import './assets/main.css'

const Vi = Object.values({ ...VIcons })
addIcons(...Vi);
// addIcons(MdExittoappTwotone,BiBox2Fill,BiHouseFill,GiForkKnifeSpoon,BiCalendarFill,FaUser,CoHamburgerMenu)

const app = createApp(App)

app.use(router)

app.component('v-icon', OhVueIcon)

app.mount('#app')
