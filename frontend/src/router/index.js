import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: "home" }
    }, {
      path: '/home',
      name: 'home',
      component: () => import('../pages/client/HomePage.vue')
    }, {
      path: '/reserve',
      name: 'reserve',
      component: () => import('../pages/client/ReservePage.vue')
    }
  ]
})

export default router
