import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const loggedIn = async () => {
  try {
    const logged = await store.dispatch("restoreSession");
    if (logged) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

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
      },
      beforeEnter: async (to, from, next) => {
        await loggedIn();
        next();
      }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
      meta: {
        showToolBar: false,
        showFooter: false
      },
      beforeEnter: async (to, from, next) => {
        if (await loggedIn()) {
          return next("/");
        }
        next();
      }
    },
    {
      path: "/sign_up",
      name: "Sign Up",
      component: () => import("@/views/SignUp.vue"),
      meta: {
        showToolBar: false,
        showFooter: false
      },
      beforeEnter: async (to, from, next) => {
        if (await loggedIn()) {
          return next("/");
        }
        next();
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile.vue"),
      meta: {
        showToolBar: true,
        showFooter: true,
        requiresAuth: true
      }
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: () => import("@/views/RestaurantDisplay.vue"),
      meta: {
        showToolBar: true,
        showFooter: true,
        requiresAuth: true
      }
    },
    {
      path: "/matching",
      name: "Matching",
      component: () => import("@/views/Matching.vue"),
      meta: {
        showToolBar: true,
        showFooter: true,
        requiresAuth: true
      }
    },
    {
      path: "/chatroom",
      name: "Chatroom",
      component: () => import("@/views/Chatroom.vue"),
      meta: {
        showToolBar: true,
        showFooter: true,
        requiresAuth: true
      }
    }
  ]
});
router.beforeEach(async (to, from, next) => {
  if (to.path === "/") next();
  else {
    let stateLoggedIn = store.state.loggedIn;
    const expiryTime = store.state.expiryTime;
    if (stateLoggedIn && expiryTime > Math.floor(Date.now() / 1000)) {
      if (to.path !== "/login" && to.path !== "/sign_up") next();
      else next("/matching");
    } else if (await loggedIn()) {
      if (to.path !== "/login" && to.path !== "/sign_up") next();
    } else {
      if (to.path === "/login" || to.path === "/sign_up") next();
      else if (expiryTime <= Math.floor(Date.now() / 1000)) {
        alert("Session expired!");
      }
      store.commit("logout");
    }
  }
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
