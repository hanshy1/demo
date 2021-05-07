import Vue from 'vue'
import Element from './Main.vue'
import vueCustomElement from 'vue-custom-element'

Vue.use(vueCustomElement)

Vue.config.productionTip = false

Vue.customElement('demo-element', Element)