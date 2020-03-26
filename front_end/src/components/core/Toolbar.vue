<template>
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
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          depressed
          large
          >{{ link.text }}</v-btn
        >
        <v-spacer />
        <v-btn :to="'sign_up'" class="ml-0 hidden-sm-and-down" depressed large
          >Sign Up</v-btn
        >
        <v-btn :to="'login'" class="ml-0 hidden-sm-and-down" depressed large
          >Login</v-btn
        >
      </v-layout>
    </v-container>
  </v-app-bar>
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
    sign_up: { text: "Sign Up", to: "sign_up" }
  }),
  methods: {
    backHome() {
      this.$router.push("/");
    }
  }
};
</script>
