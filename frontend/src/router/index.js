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
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('../pages/client/OrderPage.vue')
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('../pages/client/ReservePage.vue'),
    },
    {
      path: "/reserve/:id",
      name: "pdfReserve",
      component: () => import('../components/client/ReservePDF.vue')
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
          component: () => import('../pages/admin/ProductsPage.vue'),
          children:[
            {
              path: '',
              name: 'productos',
              component: () => import('../components/admin/ProductsListComponent.vue')
            },
            {
              path: 'nuevo_producto',
              component: () => import('../components/admin/ProductFormComponent.vue')
            },
            {
              path: ":id_producto",
              component: () => import('../components/admin/ProductFormComponent.vue')
            }
          ]
        },
        {
          path: 'reservas',
          name: 'reservas',
          component: () => import('../pages/admin/ReservesPage.vue')
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
