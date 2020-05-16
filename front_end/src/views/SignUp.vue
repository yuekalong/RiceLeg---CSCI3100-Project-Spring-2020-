/*
 * MODULE NAME: LOGIN
 * PROGRAMMER: TU CHEN HSIEN
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE SIGNUP PAGE WHICH HANDLE THE LOGIN
 *
 */
 <!--this file construct sign up for users to sign up-->
<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs10>
        <v-card>
          <!-- Cover photo -->
          <v-img
            class="white--text"
            height="200px"
            :src="require('@/assets/sign_up_cover_photo/sign_up_cover.jpg')"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox></v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <h1 style="margin-left: 0.5em" class="font-weight-light">Sign Up</h1>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <div class="red--text">{{ errMsg }}</div>
                  <!-- name text field -->
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <!-- password text field -->
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                  <!-- email text field -->
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                  <!-- displayName text field -->
                  <v-text-field
                    v-model="displayName"
                    :rules="displayNameRules"
                    label="Display Name"
                    required
                  ></v-text-field>

                  <!-- major text field -->
                  <v-text-field v-model="major" :rules="majorRules" label="Major" required></v-text-field>

                  <!-- college selection field -->
                  <v-select
                    :items="labels"
                    :value="collegeSelected"
                    :input-value="collegeSelected"
                    :v-model="collegeSelected"
                    item-text="name"
                    item-value="name"
                    :rules="[v => !!v || 'College is required']"
                    label="College"
                    required
                    autocomplete
                    return-object
                  >
                    <template slot="selection" slot-scope="data">
                      <v-chip
                        :input-value="data.selected"
                        close
                        class="chip--select-multi"
                        @input="data.parent.selectItem(data.item)"
                      >
                        {{ data.item.name }}
                        {{ inputCollege(data.item.name) }}
                      </v-chip>
                    </template>
                  </v-select>

                  <!-- year text field -->
                  <v-text-field v-model="year" :rules="yearRules" label="Year" required></v-text-field>

                  <!-- self-introduction text field -->
                  <v-text-field
                    v-model="selfIntro"
                    :rules="selfIntroRules"
                    label="Self-Introduction"
                    required
                  ></v-text-field>

                  <!-- checkbox -->
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Confirm all your information is correct"
                    required
                  ></v-checkbox>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text :to="'/'">Return To Home</v-btn>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitData">Submit</v-btn>

            <v-snackbar v-model="finished">
              {{ finishedMsg }}
              <v-btn color="pink" text @click="finished = false">Close</v-btn>
            </v-snackbar>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { service } from "@/plugins/request_service";
import router from "../../node_modules/vue-router";
export default {
  data: () => ({
    data: "",
    valid: false,
    lazy: false,
    name: "",
    chip: true,

    //selection set for college
    labels: [
      { name: "Chung Chi College" },
      { name: "New Asia College" },
      { name: "United College" },
      { name: "Shaw College" },
      { name: "Lee Woo Sing College" },
      { name: "Wu Yee Sun College" },
      { name: "S.H. Ho College" },
      { name: "CW Chu College" },
      { name: "Morningside College" }
    ],

    //rules for username
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 15) || "Name must be less than 15 characters"
    ],
    email: "",

    //rules for email
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@link.cuhk.edu.hk+/.test(v) || "E-mail must be valid"
    ],
    major: "",

    //rules for major
    majorRules: [v => !!v || "Major is required"],

    displayName: "",

    //rules for display name
    displayNameRules: [v => !!v || "Ur display name is required"],

    password: "",

    //rules for password
    passwordRules: [
      v =>
        (v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      v => (v && v.length >= 6) || "Password must be at least 6 characters",
      v => !!v || "Password is required"
    ],

    selfIntro: "",

    //rules for self introduction
    selfIntroRules: [v => !!v || "Self-Introduction is required"],

    year: "",

    //rules for year
    yearRules: [
      v => (v || "").match(/^[0-9]*[1-9][0-9]*$/) || "year is required"
    ],

    select: null,
    college: [
      "Chung Chi College",
      "New Asia College",
      "United College",
      "Shaw College",
      "Lee Woo Sing College",
      "Wu Yee Sun College",
      "S.H. Ho College",
      "CW Chu College",
      "Morningside College"
    ],
    collegeSelected: "",
    checkbox: false,
    finished: false,
    validateSubmit: false,
    finishedMsg:
      "You have finished SignUp Procedure,You can press Return to Home to leave!",
    errMsg: ""
  }),
  mounted() {},
  methods: {
    inputCollege(input) {
      this.collegeSelected = input;
    },
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
    },
    validateInfo() {
      // not use
      if (
        this.name == "" ||
        this.password == "" ||
        this.displayName == "" ||
        this.major == "" ||
        this.year == "" ||
        this.college == "" ||
        this.selfIntro == ""
      ) {
        alert("you have not complete on writing your information");
        return 0;
      }
    },

    //method to submit user information to the database
    submitData() {
      service
        .post("/auth/signUp", {
          username: this.name,
          password: this.password,
          email: this.email,
          displayName: this.displayName,
          major: this.major,
          year: this.year,
          college: this.collegeSelected,
          selfIntro: this.selfIntro
        })
        .then(res => {
          //action for successful connection
          if (res.data.success) {
            console.log("Update to database success!");
            this.finished = true;
            this.$router.push("/");
          } else {
            //action for unsuccessful connection
            console.log("Update to database failed!");
          }
        })
        .catch(err => {
          this.errMsg = "Username already taken!";
        });
    }
  },
  watch: {
    name() {
      this.errMsg = "";
    }
  }
};
</script>
