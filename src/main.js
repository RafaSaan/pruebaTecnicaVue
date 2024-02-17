import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartPie, faFileSignature, faFloppyDisk, faPen, faPlus, faSmileBeam, faStar, faTrash, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(
  faChartPie,
  faFileSignature,
  faUsers,
  faPlus,
  faPen,
  faSmileBeam,
  faStar,
  faTrash,
  faXmark,
  faFloppyDisk
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
