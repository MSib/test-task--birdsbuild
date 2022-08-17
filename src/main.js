import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './assets/fonts/rubik/rubik.css'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
