import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from '@/router';

import ElementPlus from 'element-plus'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(router);
app.use(VueSweetalert2);
app.use(ElementPlus, { size: 'medium', zIndex: 3000 })
app.mount('#app');
