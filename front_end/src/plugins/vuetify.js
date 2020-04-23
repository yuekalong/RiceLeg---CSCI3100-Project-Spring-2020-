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
