/* Inkludera Bootstrap CSS-fil */
import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

/* Inkludera Bootstrap JS-fil */
import 'bootstrap/dist/js/bootstrap.js'