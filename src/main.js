
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import TextArea from "primevue/textarea";
import Password from 'primevue/password';
import Select from 'primevue/select';

import 'primeicons/primeicons.css'
import './assets/style/_main.scss'

const pinia = createPinia()
const app = createApp(App)

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Select', Select);
app.component('TextArea', TextArea);

app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app')
