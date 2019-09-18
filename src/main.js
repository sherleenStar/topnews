import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
// import axios from 'axios'

// Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://localhost:8080/'
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
