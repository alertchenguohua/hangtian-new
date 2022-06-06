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
      {
        path: "planMap",
        meta: {
          title: "规划地图",
        },
        component: () => import("../views/plan-map.vue"),
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

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
