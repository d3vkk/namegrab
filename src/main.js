import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/css/index.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
