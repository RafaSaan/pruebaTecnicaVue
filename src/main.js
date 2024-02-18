import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faChartPie, faFileSignature, faFloppyDisk, faPaperPlane, faPen, faPlus, faSmileBeam, faStar, faTrash, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons'

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
  faFloppyDisk,
  faPaperPlane,
  faBars
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
