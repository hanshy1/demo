import Vue from 'vue'
import App from './Main.vue'
import vueCustomElement from 'vue-custom-element'
import vuetify from './module/vuetify'
import router from './module/router'

Vue.use(vueCustomElement)

// Vue.use(vuetify)

Vue.config.productionTip = false

Vue.customElement('demo-element', App)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')