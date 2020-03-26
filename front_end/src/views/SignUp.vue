<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          :src="require('@/assets/sign_up_cover_photo/sign_up_cover.jpg')"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox> </v-flex>
            </v-layout>
          </v-container>
        </v-img>

        <v-card-title class="display-1 font-weight-light">Sign Up</v-card-title>
        <v-card-text>
          <v-flex xs12 md6>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="6"
                label="Password"
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="major"
                :rules="majorRules"
                label="Major"
                required
              ></v-text-field>

              <v-select
                v-model="select"
                :items="college"
                :rules="[v => !!v || 'College is required']"
                label="College"
                required
              ></v-select>

              <v-text-field v-model="Bio" label="Bio" required></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Confirm all your information is correct"
                required
              ></v-checkbox>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" color="primary" @click="validate">
                  Validate
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="reset">
                  Reset Form
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="warning" @click="resetValidation">
                  Reset Validation
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-form>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat>Cancel</v-btn>
          <v-btn flat color="primary">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@link.cuhk.edu.hk+/.test(v) || "E-mail must be valid"
    ],
    major: "",
    majorRules: [v => !!v || "Major is required"],

    password: "",
    passwordRules: [
      v =>
        (v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      v => (v && v.length >= 6) || "Password must be More than 6 characters",
      v => !!v || "Password is required"
    ],

    select: null,
    college: [
      "CC",
      "NA",
      "UC",
      "Shaw",
      "WS",
      "WYS",
      "SHHo",
      "CWChu",
      "Morningside"
    ],
    checkbox: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
