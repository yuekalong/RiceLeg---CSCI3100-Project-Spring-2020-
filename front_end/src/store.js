/*
 * MODULE NAME: STORE
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE VUEX DOCUMENT WHICH IS A STATE MANAGEMENT PLUGIN
 *
 */
import Vue from "vue";
import Vuex from "vuex";
import { service } from "@/plugins/request_service";

Vue.use(Vuex);

export default new Vuex.Store({
  // here are the state we want to use
  state: {
    showToolBar: true, // this is controlling where the toolbar show or not
    showFooter: true, // this is controlling where the footer show or not
    token: undefined, // this is storing the jwt token
    expiryTime: "", // this is storing the expiry time for login
    user: undefined, // this is storing the current user information
    loggedIn: false // this is storing the user have logged in or not
  },
  mutations: {
    // to assign new value to state 'showToolBar'
    showToolBar(state, val) {
      state.showToolBar = val;
    },

    // to assign new value to state 'showFooter'
    showFooter(state, val) {
      state.showFooter = val;
    },

    // to set the things when login
    login(state, obj) {
      localStorage.setItem("JWT", obj.token); // set the localStorage to have JWT token
      localStorage.setItem("expiryTime", obj.exp); // set the localStorage to have expiry time
      state.token = obj.token; // set the state to have the token for vue framework (it keep storing after refreshes)
      state.user = obj.user; // set the state to have the user information for vue framework (it keep storing after refreshes)
      state.expiryTime = obj.exp; // set the state to have the expiry time for vue framework (it keep storing after refreshes)
      state.loggedIn = true; // set the state 'loggedIn' to be true for vue framework (it keep storing after refreshes)
    },

    // to remove the things when log out
    logout(state) {
      localStorage.removeItem("JWT"); // remove the localStorage to have JWT token
      localStorage.removeItem("expiryTime"); // remove the localStorage to have expiry time
      state.token = undefined; // remove the state 'token'
      state.user = undefined; // remove the state 'user'
      state.expiryTime = ""; // remove the state 'expiryTime'
      state.loggedIn = false; // set the state 'loggedIn' to be false for vue framework
    }
  },
  actions: {
    // this handle the login request in front-end
    async login(context, credentials) {
      // this helps to send the credentials to our back-end server to check they are correctly or not
      return await service
        .post("/auth/login", {
          username: credentials.username,
          password: credentials.password
        })
        .then(res => {
          // if the credential are correct
          if (res.data.success) {
            // assign the variables to state by the function 'login' in mutation
            context.commit("login", {
              token: res.data.data.token,
              user: res.data.data.userInfo[0],
              exp: Math.floor(Date.now() / 1000) + 60 * 360
            });
            // return the user information to have a signal
            return res.data.data.user;
          } else {
            // activate the function 'logout' in mutation
            context.commit("logout");
            // throw error
            throw "Wrong username or password";
          }
        })
        .catch(err => {
          throw err;
        });
    },

    // this is use to restore the session when everytime refreshes
    async restoreSession(context) {
      const token = await localStorage.getItem("JWT"); // get the local storage JWT token
      const expiryTime = await localStorage.getItem("expiryTime"); // get the local storage expiry time

      // remove all the local storage and states first
      context.commit("logout");

      if (expiryTime <= Math.floor(Date.now() / 1000)) {
        // if the login expired, throw error
        throw "Session expired!";
      }

      // to check logged in in back-end or not
      let res = await service.get(`/auth/checkLogged`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (res.data.success) {
        // if logged in
        let result = res.data.data;
        let obj = {
          token: result.token,
          user: result.userInfo[0],
          exp: expiryTime
        };

        // assign the user information by running 'login' in mutation
        context.commit("login", obj);

        return context.state.loggedIn; //return the state 'loggedIn'
      } else {
        // if still not log in
        service.get("/auth/logout"); //logout again in back-end ensure clear everything in back-end

        // throw logout
        throw "logout";
      }
    },

    // this handle the log out request in front-end
    async logout(context) {
      // logout in back-end first
      let res = await service.get(`/auth/logout`);
      if (res.data.data.success) {
        // remove the local storage things
        localStorage.removeItem("JWT");
        localStorage.removeItem("expiryTime");

        // run 'logout' to remove all the login states
        context.commit("logout");
      }
      // return the state 'loggedIn'
      return context.state.loggedIn;
    }
  }
});
