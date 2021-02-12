import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import Card from 'primevue/card';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';


const app = createApp(App)

app.use(PrimeVue);
app.component('Card', Card);
app.component('Button', Button);
app.component('ProgressSpinner', ProgressSpinner);

app.mount('#app')
