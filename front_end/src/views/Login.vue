/*
 * MODULE NAME: LOGIN
 * PROGRAMMER: YUE KA LONG, TU CHEN HSIEN
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE LOGIN PAGE WHICH HANDLE THE LOGIN
 *
 */
 <!--this file construct login for users to login-->
<template>
  <div id="login">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-card :width="size()">
          <v-card-title class="grey--text display-1 font-weight-light">Login</v-card-title>
          <v-card-text>
            <v-container>
              <h2 class="headline font-weight-light">Hello！</h2>
              <br />
              <v-flex xs12 md6>
                <div class="red--text subtitle-1">{{ errorMsg }}</div>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <!--username textfield-->
                  <v-text-field
                    v-model="username"
                    :rules="nameRules"
                    prepend-inner-icon="fas fa-user"
                    label="Username"
                    required
                    outlined
                    shaped
                    @keyup.enter="login"
                  ></v-text-field>
                  <!--password textfield-->
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    prepend-inner-icon="fas fa-key"
                    label="Password"
                    type="password"
                    outlined
                    shaped
                    @keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-flex>
            </v-container>
            <v-card-actions>
              <!--Login button-->
              <v-btn color="secondary" @click="login">Login</v-btn>
              <v-spacer></v-spacer>
              <!--Return to home button-->
              <v-btn :to="'/'">Go Back</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data: () => ({
    valid: false,

    //username rules
    username: "",
    nameRules: [
      v => !!v || "Username is required",
      v => (v && v.length <= 10) || "Username must be less than 10 characters"
    ],

    //password rules
    password: "",
    passwordRules: [
      v =>
        (v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      v => (v && v.length >= 6) || "Password must be More than 6 characters",
      v => !!v || "Password is required"
    ],
    errorMsg: ""
  }),

  //methods to provide phone views
  methods: {
    size() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "90%";
        case "sm":
          return "90%";
        case "md":
          return "70%";
        case "lg":
          return "70%";
        case "xl":
          return "70%";
      }
    },
    login() {
      this.$store
        //check whether username matches the corresponding password
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.$router.push("/matching");
        })
        .catch(error => {
          //catch error in case username didn't match corresponding password
          //or username doesn't exist
          this.errorMsg = "Invalid Credentials";
        });
    }
  }
};
</script>
