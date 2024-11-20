import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PopperPlugin from "vue3-popper";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("PopperPlugin", PopperPlugin);

if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.add('dark');
}
app.mount('#app')