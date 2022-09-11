import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { registerSW } from "virtual:pwa-register/vue";
registerSW();

createApp(App).mount('#app')
