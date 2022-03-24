import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from "@/views/AuthView";

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomeView },
  { path: '/auth', component: AuthView },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
