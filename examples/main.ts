import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import VuecmfDialog from "../packages/index"

createApp(App).use(VuecmfDialog).mount('#app')

