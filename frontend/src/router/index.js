import { createRouter, createWebHistory } from "vue-router";
import authGuard from "../services/guards/AuthGuard";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "home" },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../pages/client/HomePage.vue"),
    },
    {
      path: "/reserve",
      name: "reserve",
      meta: { requiredAuth: true},
      component: () => import("../pages/client/ReservePage.vue"),
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('../pages/client/OrderPage.vue')
    },
    {
      path: '/productos/:id_producto',
      name: 'producto_details',
      component: () =>  import('../pages/client/ProductDetailsPage.vue')

    },
    {
      path: "/carrito",
      name: "carrito",
      meta: { requiredAuth: true },
      component: () => import("../pages/client/CartPage.vue")
    },
    {
      path: "/perfil",
      name: "perfil",
      meta: { requiredAuth: true },
      component: () => import("../pages/client/NavProfilePage.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/client/ProfilePage.vue"),
        },
        {
          path: "pedidos",
          component: () => import("../pages/client/ClientOrdersPage.vue")
        },
        {
          path: "reservas",
          component: () => import("../pages/client/ClientReservesPage.vue")
        }
      ]
    },
    {
      path: "/reserve/:id",
      name: "pdfReserve",
      component: () => import("../components/client/ReservePDF.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      beforeEnter: authGuard.authIsAdmin, 
      meta: { requiredAuth: true },
      component: () => import("../pages/admin/HomePage.vue"),
      children: [
        {
          path: "",
          redirect: "/admin/dashboard",
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("../pages/admin/DashboardPage.vue"),
        },
        {
          path: "productos",
          name: "productos",
          component: () => import("../pages/admin/ProductsPage.vue"),
          children: [
            {
              path: "",
              name: "productos",
              component: () =>
                import("../components/admin/ProductsListComponent.vue"),
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
          path: "reservas",
          name: "reservas",
          component: () => import("../pages/admin/ReservesPage.vue"),
          children: [
            { 
              path: "nueva_reserva",
              name: "reserva",
              component: () => import("../pages/admin/ReservesPage.vue")
            },
            {
              path: ":id",
              name: "reservas",
              component: () => import("../pages/admin/ReservesPage.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../pages/client/AuthFormPage.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../pages/PageNotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (cookies.get('token_client') != null && cookies.get('token_client')) {
      next()
      return
    }

    next("/auth")
  } else {
    next()
  }
})

export default router;
