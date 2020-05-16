/*
 * MODULE NAME: ROUTER
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE VUE ROUTER DOCUMENT WHICH HELPS TO MANAGE THE ROUTES
 *
 */
import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

// check the user logged in or not
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
  mode: "history", // ensure no refresh during page changes
  base: process.env.BASE_URL, // set the base url here (which should be localhost:3000)
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"), // import the vue component which is the home page of the application
      meta: {
        showToolBar: true, // set the toolbar to be visible
        showFooter: true // set the footer to be visible
      },
      beforeEnter: async (to, from, next) => {
        await loggedIn(); // check the user logged in or not
        next(); // allow to go in home page
      }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"), // import the vue component which is the login page of the application
      meta: {
        showToolBar: false, // set the toolbar to be disappeared
        showFooter: false // set the footer to be disappeared
      },
      beforeEnter: async (to, from, next) => {
        // check it logged in or not
        if (await loggedIn()) {
          return next("/"); //if logged in redirect to home page because no more login should be allowed
        }
        next(); // else allow to go in login page
      }
    },
    {
      path: "/sign_up",
      name: "Sign Up",
      component: () => import("@/views/SignUp.vue"), // import the vue component which is the sign up page of the application
      meta: {
        showToolBar: false, // set the toolbar to be disappeared
        showFooter: false // set the footer to be disappeared
      },
      beforeEnter: async (to, from, next) => {
        // check it logged in or not
        if (await loggedIn()) {
          return next("/"); // if logged in redirect to home page because no more login should be allowed
        }
        next(); // else allow to go in login page
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile.vue"), // import the vue component which is the Profile page of the application
      meta: {
        showToolBar: true, // set the toolbar to be visible
        showFooter: true, // set the footer to be visible
        requiresAuth: true // required login before entering this page, if not , user cannot go in this page
      }
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: () => import("@/views/RestaurantDisplay.vue"), // import the vue component which is the Restaurant Display page of the application
      meta: {
        showToolBar: true, // set the toolbar to be visible
        showFooter: true, // set the footer to be visible
        requiresAuth: true // required login before entering this page, if not , user cannot go in this page
      }
    },
    {
      path: "/matching",
      name: "Matching",
      component: () => import("@/views/Matching.vue"), // import the vue component which is the Matching page of the application
      meta: {
        showToolBar: true, // set the toolbar to be visible
        showFooter: true, // set the footer to be visible
        requiresAuth: true // required login before entering this page, if not , user cannot go in this page
      }
    },
    {
      path: "/chatroom",
      name: "Chatroom",
      component: () => import("@/views/Chatroom.vue"), // import the vue component which is the Chatroom page of the application
      meta: {
        showToolBar: true, // set the toolbar to be visible
        showFooter: true, // set the footer to be visible
        requiresAuth: true // required login before entering this page, if not , user cannot go in this page
      }
    }
  ]
});

// before each time it change the route
router.beforeEach(async (to, from, next) => {
  // if want to go home page, no need authenication
  if (to.path === "/") next();
  else {
    let stateLoggedIn = store.state.loggedIn; // get the state loggedIn
    const expiryTime = store.state.expiryTime; // get the state expiryTime

    // check the user have logged in or not and it is expired or not
    if (stateLoggedIn && expiryTime > Math.floor(Date.now() / 1000)) {
      // if logged in
      // if the path is not login or sign_up it can be go
      if (to.path !== "/login" && to.path !== "/sign_up") next();
      else next("/matching"); // else go to matching route
    } else if (await loggedIn()) {
      // ensure when state disappear for some kind of reason, check again
      // if the path is not login or sign_up it can be go
      if (to.path !== "/login" && to.path !== "/sign_up") next();
    } else {
      // if the path is not login or sign_up it can be go
      if (to.path === "/login" || to.path === "/sign_up") next();
      // if the log in expired
      else if (expiryTime <= Math.floor(Date.now() / 1000)) {
        alert("Session expired!"); // alert session expired
      }
      // commit logout
      store.commit("logout");
    }
  }
});

// before loading the page to display
router.beforeResolve((to, from, next) => {
  try {
    let showToolBar = to.matched
      .slice()
      .reverse()
      .find(m => typeof m.meta.showToolBar !== "undefined"); // check the Toolbar should be show or not
    let showFooter = to.matched
      .slice()
      .reverse()
      .find(m => typeof m.meta.showFooter !== "undefined"); // check the Footer should be show or not

    // assign the value to the state
    store.commit(
      "showToolBar",
      showToolBar ? showToolBar.meta.showToolBar : true
    );
    store.commit("showFooter", showFooter ? showFooter.meta.showFooter : true);
  } catch (error) {}
  next();
});
export default router;
