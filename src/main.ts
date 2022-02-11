import Vue from 'vue'
import App from './Main.vue'
import vueCustomElement from 'vue-custom-element'
import vuetify from './module/vuetify'

Vue.use(vueCustomElement)

// Vue.use(vuetify)

Vue.config.productionTip = false

Vue.customElement('demo-element', App)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')