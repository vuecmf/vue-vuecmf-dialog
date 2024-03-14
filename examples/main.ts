import { createApp } from 'vue'

import App from './App.vue'
import VuecmfDialog from "../packages/index"

const app = createApp(App)
app.use(VuecmfDialog)
app.mount('#app')
