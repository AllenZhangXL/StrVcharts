import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App.vue'

// Vue.config.productionTip = false

Vue.use(VCharts)

new Vue({
  render: h => h(App),
}).$mount('#app')

