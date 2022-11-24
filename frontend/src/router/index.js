import { createRouter, createWebHistory } from 'vue-router'
import Home from "../pages/HomePage.vue";
import ListTables from "../pages/TableList.vue";
import AddTable from "../pages/AddTable.vue";
import UpdateTable from "../pages/UpdateTable.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: { name: "home" } } ,
    { path: "/home", name: "home", component: Home },
    { path: "/tables", name: "tables", component: ListTables },
    { path: "/tables/add", name: "addTable", component: AddTable },
    { path: "/tables/update", name: "updateTable", component: UpdateTable }
  ]
})

export default router
