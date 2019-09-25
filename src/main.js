import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import Axios from './utils/axios.config'
import Components from './components'

Vue.use(Components)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
