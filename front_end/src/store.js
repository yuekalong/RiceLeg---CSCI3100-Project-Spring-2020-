import Vue from "vue";
import Vuex from "vuex";
import { service } from "@/plugins/request_service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showToolBar: true,
    showFooter: true,
    token: undefined,
    expiryTime: "",
    user: undefined,
    loggedIn: false
  },
  mutations: {
    showToolBar(state, val) {
      state.showToolBar = val;
    },
    showFooter(state, val) {
      state.showFooter = val;
    },
    login(state, obj) {
      localStorage.setItem("JWT", obj.token);
      localStorage.setItem("expiryTime", obj.exp);
      state.token = obj.token;
      state.user = obj.user;
      state.expiryTime = obj.exp;
      state.loggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("JWT");
      localStorage.removeItem("expiryTime");
      state.token = undefined;
      state.user = undefined;
      state.expiryTime = "";
      state.loggedIn = false;
    }
  },
  actions: {
    async login(context, credentials) {
      return await service
        .post("/auth/login", {
          username: credentials.username,
          password: credentials.password
        })
        .then(res => {
          if (res.data.success) {
            context.commit("login", {
              token: res.data.data.token,
              user: res.data.data.userInfo[0],
              exp: Math.floor(Date.now() / 1000) + 60 * 360
            });
            return res.data.data.user;
          } else {
            context.commit("logout");
            // service.get("/auth/logout");
            throw "Wrong username or password";
          }
        })
        .catch(err => {
          throw err;
        });
    },
    async restoreSession(context) {
      const token = await localStorage.getItem("JWT");
      const expiryTime = await localStorage.getItem("expiryTime");
      context.commit("logout");
      if (expiryTime <= Math.floor(Date.now() / 1000)) {
        throw "Session expired!";
      }
      let res = await service.get(`/auth/checkLogged`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (res.data.success) {
        let result = res.data.data;
        let obj = {
          token: result.token,
          user: result.userInfo[0],
          exp: expiryTime
        };
        context.commit("login", obj);
        return context.state.loggedIn;
      } else {
        service.get("/auth/logout");
        throw "logout";
      }
    },
    async logout(context) {
      let res = await service.get(`/auth/logout`);
      if (res.data.data.success) {
        localStorage.removeItem("JWT");
        localStorage.removeItem("expiryTime");
        context.commit("logout");
      }
      return context.state.loggedIn;
    }
  }
});
