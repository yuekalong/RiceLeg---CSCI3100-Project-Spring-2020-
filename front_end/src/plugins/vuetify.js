/*
 * MODULE NAME: VUETIFY
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE VUETIFY DOCUMENT WHICH SET THE VARIABLE FOR SOME COLOR CODE
 *          AND IT HELPS TO USE MORE EASILY AND SYNC THE STYLE OF THE APPLICATION
 *
 */
import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FFB6D0",
        secondary: "#95818D",
        tertiary: "#576066"
      }
    }
  },
  icons: {
    iconfont: "fa" // default - only for display purposes
  }
});
