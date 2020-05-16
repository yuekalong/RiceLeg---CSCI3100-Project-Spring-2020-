/*
 * MODULE NAME: MAIN
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE VUE DOCUMENT WHICH HELPS TO MANAGE ALL THE PLUGINS
 *
 */
import Vue from "vue";
import vuetify from "./plugins/vuetify";
import "./plugins/base";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
