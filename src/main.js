import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// 🔹 Instalar Pinia antes de todo
const pinia = createPinia();
app.use(pinia);

app.use(router);
app.mount('#app');

// 🔹 Opcional: hacer pinia global para debug rápido en la consola
window.pinia = pinia;
