<template>
  <nav>
    <v-app-bar app flat>
      <v-container mx-auto py-0>
        <v-layout>
          <v-img
            :src="require('@/assets/logo.png')"
            class="mr-5"
            contain
            height="48"
            width="48"
            max-width="48"
            @click="backHome()"
          />
          <template v-for="(link, i) in links">
            <v-btn
              v-if="$store.state.loggedIn"
              :key="i"
              :to="link.to"
              class="ml-0 hidden-sm-and-down"
              depressed
              large
              >{{ link.text }}</v-btn
            >
          </template>
          <v-spacer />
          <v-btn
            v-if="!$store.state.loggedIn"
            :to="'sign_up'"
            class="ml-0 hidden-sm-and-down"
            depressed
            large
            >Sign Up</v-btn
          >
          <v-btn
            v-if="!$store.state.loggedIn"
            :to="'login'"
            class="ml-0 hidden-sm-and-down"
            depressed
            large
            >Login</v-btn
          >

          <v-menu
            class="ml-0 hidden-sm-and-down"
            v-if="$store.state.loggedIn"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                class="ml-0 hidden-sm-and-down"
                fab
                depressed
                color="primary"
                v-on="on"
              >
                <v-icon large dark>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-btn
                  class="ml-0 hidden-sm-and-down"
                  depressed
                  block
                  :to="'profile'"
                  >Profile</v-btn
                >
              </v-list-item>
              <v-list-item>
                <v-btn
                  class="ml-0 hidden-sm-and-down"
                  depressed
                  block
                  @click="logout"
                  >Logout</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-layout>
      </v-container>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-resize="fetchWindowSize"
      :height="windowHeight"
      v-model="drawer"
      temporary
      fixed
      app
    >
      <v-list>
        <v-list-item class="justify-center">
          <v-btn fab depressed color="primary" :to="'profile'">
            <v-icon large dark>mdi-account-circle</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item v-for="(link, i) in links" :key="i">
          <v-btn
            v-if="$store.state.loggedIn"
            :key="i"
            :to="link.to"
            depressed
            block
            >{{ link.text }}</v-btn
          >
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list-item>
          <v-btn v-if="!$store.state.loggedIn" :to="'sign_up'" depressed block
            >Sign Up</v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn v-if="!$store.state.loggedIn" :to="'login'" depressed block
            >Login</v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn v-if="$store.state.loggedIn" depressed block @click="logout"
            >Logout</v-btn
          >
        </v-list-item>
        <v-list-item></v-list-item>
        <v-spacer />
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    links: [
      { text: "Restaurant", to: "restaurant" },
      { text: "Matching", to: "matching" },
      { text: "Chatroom", to: "chatroom" }
    ],
    login: { text: "Login", to: "login" },
    sign_up: { text: "Sign Up", to: "sign_up" },
    drawer: false,
    windowHeight: 375
  }),
  mounted() {
    this.fetchWindowSize();
  },
  methods: {
    fetchWindowSize() {
      this.windowHeight = window.innerHeight;
    },
    backHome() {
      this.$router.push("/");
    },
    async logout() {
      if (this.$socket != null) {
        await this.$socket.emit("leavePage", this.$store.state.user);
      }
      await this.$store.dispatch("logout").then(res => {
        this.$router.push("/");
      });
    }
  }
};
</script>
