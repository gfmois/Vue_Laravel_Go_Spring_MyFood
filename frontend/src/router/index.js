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
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('../pages/client/ReservePage.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/admin/HomePage.vue'),
      children:[
        {
          path: '', 
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component:() => import('../pages/admin/DashboardPage.vue')
        },
        {
          path: 'productos', 
          name: 'productos',
          component: () => import('../pages/admin/ProductsPage.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../pages/PageNotFound.vue')
    }, 
  ]
})

export default router
