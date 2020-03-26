import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        showToolBar: true,
        showFooter: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
      meta: {
        showToolBar: false,
        showFooter: false
      }
    },
    {
      path: "/sign_up",
      name: "Sign Up",
      component: () => import("@/views/SignUp.vue"),
      meta: {
        showToolBar: false,
        showFooter: false
      }
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: () => import("@/views/RestaurantDisplay.vue"),
      meta: {
        showToolBar: true,
        showFooter: true
      }
    },
    {
      path: "/matching",
      name: "Matching",
      component: () => import("@/views/Matching.vue"),
      meta: {
        showToolBar: true,
        showFooter: true
      }
    },
    {
      path: "/chatroom",
      name: "Chatroom",
      component: () => import("@/views/Chatroom.vue"),
      meta: {
        showToolBar: true,
        showFooter: true
      }
    }
  ]
});

router.beforeResolve((to, from, next) => {
  try {
    let showToolBar = to.matched
      .slice()
      .reverse()
      .find(m => typeof m.meta.showToolBar !== "undefined");
    let showFooter = to.matched
      .slice()
      .reverse()
      .find(m => typeof m.meta.showFooter !== "undefined");
    store.commit(
      "showToolBar",
      showToolBar ? showToolBar.meta.showToolBar : true
    );
    store.commit("showFooter", showFooter ? showFooter.meta.showFooter : true);
  } catch (error) {}
  next();
});

export default router;
