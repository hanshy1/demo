import VueRouter from 'vue-router'
import routerDef from './routerDef'

const routes = [
  ...routerDef
]

const router = new VueRouter({routes})

export default router