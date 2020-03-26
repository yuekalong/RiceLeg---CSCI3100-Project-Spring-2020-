import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    items: [
      {
        text: "Home",
        to: "/"
      },
      {
        text: "About",
        href: "#about"
      }
    ],
    showToolBar: true,
    showFooter: true
  },
  getters: {
    categories: state => {
      const categories = [];

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        )
          continue;

        const text = article.category;

        categories.push({
          text,
          to: `/category/${text}`
        });
      }

      return categories.sort().slice(0, 4);
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories);
    }
  },
  mutations: {
    showToolBar(state, val) {
      state.showToolBar = val;
    },
    showFooter(state, val) {
      state.showFooter = val;
    }
  },
  actions: {}
});
