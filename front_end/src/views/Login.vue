<template>
  <div id="login">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-card :width="size()">
          <v-card-title class="grey--text display-1 font-weight-light"
            >Login</v-card-title
          >
          <v-card-text>
            <v-container>
              <h2 class="headline font-weight-light">Hello！</h2>
              <br />
              <v-flex xs12 md6>
                <div class="red--text subtitle-1">{{ errorMsg }}</div>
                <v-form ref="form" v-model="valid" lazy-validation>
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
              <v-btn color="secondary" @click="login">Login</v-btn>
              <v-spacer></v-spacer>
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
    username: "",
    nameRules: [
      v => !!v || "Username is required",
      v => (v && v.length <= 10) || "Username must be less than 10 characters"
    ],
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
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.$router.push("/matching");
        })
        .catch(error => {
          this.errorMsg = "Invalid Credentials";
        });
    }
  }
};
</script>
