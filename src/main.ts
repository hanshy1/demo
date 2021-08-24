import Vue from 'vue'
import App from './Main.vue'
import vueCustomElement from 'vue-custom-element'
import vuex from 'vuex'

Vue.use(vueCustomElement)
Vue.use(vuex)

Vue.config.productionTip = false

Vue.customElement('demo-element', App)