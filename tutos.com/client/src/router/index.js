import Vue from "vue";
import VueRouter from "vue-router";
import Add from "../views/add.vue";
import Home from "../views/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/add",
    name: "add new tutorial",
    component: Add,
  },
  {
    path: "/edit/:id",
    name: "edit tutorial",
    component: Add,
  },
];

const router = new VueRouter({
  mode: "history",
  //base: process.env.VUE_APP_API_ROOT,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === from.name) {
    return next();
  }
  next();
  //   if (to.matched.some((record) => record.meta.requiresAuth)) {
  //     if (localStorage.getItem("user") == null) {
  //       next({
  //         path: "/login",
  //       });
  //     } else {
  //       next();
  //     }
  //   } else {
  //     next();
  //   }
});

export default router;
