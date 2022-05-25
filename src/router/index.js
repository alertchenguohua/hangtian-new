import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "planControl",
    children: [
      {
        path: "planControl",
        meta: {
          title: "规划控制",
        },
        component: () => import("../views/plan-control.vue"),
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () => import("../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
