/* * MODULE NAME: PROFILE * PROGRAMMER: LAM HIU LUI * VERSION: 1.0 (16 MAY 2020)
* * PURPOSE: PROFILE PAGE STRUCTURE OF RICELEG * PROVIDE FUNCTIONALITIES OF
PROFILE MANAGEMENT (CHANGE PASSWORD, CHANGE DISPLAY NAME, CHANGE SELF
INTRODUCTION) */
<template>
  <div id="chatroom">
    <v-container grid-list-xl>
      <v-card color="secondary">
        <v-card-title class="white--text">
          <h1 class="font-weight-light">Profile</h1>
        </v-card-title>
        <div></div>
        <v-progress-circular
          class="justify-center"
          :size="50"
          v-if="!loaded"
          indeterminate
          color="teritary"
          style="text-align:center;"
        ></v-progress-circular>
        <v-card-text class="white">
          <!-- Below will display current user profile details -->
          <v-container>
            <v-card-text class="title pb-0"
              >Username: {{ user.username }}</v-card-text
            >
            <v-row no-gutters>
              <v-col class="col-8">
                <v-card-text class="title pb-0"
                  >Display name: {{ user.displayName }}</v-card-text
                >
              </v-col>
              <v-col>
                <!-- User can change display name -->
                <v-btn class="pb-0" @click="changedn = true"
                  >Change display name</v-btn
                >
                <v-dialog v-model="changedn" persistent max-width="500">
                  <v-card width="100%">
                    <v-card-title class="headline"
                      >Change display name</v-card-title
                    >
                    <v-row>
                      <v-col class="col-1"></v-col>
                      <v-col sm="6">
                        <v-text-field
                          label="New display name"
                          required
                          v-model="newdn"
                          clearable
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-col cols="12" sm="6" md="4"> </v-col>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="secondary"
                        text
                        @click="
                          changedn = false;
                          newdn = null;
                        "
                        >Go back</v-btn
                      >
                      <v-btn color="primary" text @click="updateProfile()"
                        >Yes</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="col-8">
                <v-card-text class="title pb-0"
                  >Password: ●●●●●●●●●●</v-card-text
                >
              </v-col>
              <v-col>
                <!-- User can change password by entering old password and new password twice -->
                <v-btn class="pb-0" @click="changepw = true"
                  >Change password</v-btn
                >
                <v-dialog v-model="changepw" persistent max-width="500">
                  <v-card width="100%">
                    <v-card-title class="headline"
                      >Change password</v-card-title
                    >
                    <v-row>
                      <v-col class="col-1"></v-col>
                      <v-col sm="8">
                        <v-text-field
                          label="Old password"
                          required
                          v-model="oldpw"
                          :rules="passwordRules"
                          :type="passwordFieldType"
                          clearable
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="col-1"></v-col>
                      <v-col sm="8">
                        <v-text-field
                          label="New password"
                          required
                          v-model="newpw"
                          :rules="passwordRules"
                          :type="passwordFieldType"
                          clearable
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="col-1"></v-col>
                      <v-col sm="8">
                        <v-text-field
                          label="Re-enter password"
                          required
                          v-model="repw"
                          :rules="passwordRules"
                          :type="passwordFieldType"
                          clearable
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <!-- User can click on the eye icon to make password visible -->
                      <v-btn
                        type="password"
                        @click="switchVisibility"
                        text
                        small
                      >
                        <v-icon>fas fa-eye</v-icon>
                      </v-btn>
                      <v-btn
                        color="secondary"
                        text
                        @click="
                          changepw = false;
                          oldpw = null;
                          newpw = null;
                          repw = null;
                        "
                        >Go back</v-btn
                      >
                      <v-btn color="primary" text @click="updateProfile()"
                        >Yes</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <v-card-text class="title pb-0"
              >Email: {{ user.email }}</v-card-text
            >
            <v-card-text class="title pb-0">Year: {{ user.year }}</v-card-text>
            <v-card-text class="title pb-0"
              >Major: {{ user.major }}</v-card-text
            >
            <v-card-text class="title pb-0"
              >College: {{ user.college }}</v-card-text
            >
            <v-row no-gutters>
              <v-col class="col-8">
                <v-card-text class="title pb-0"
                  >Self Introduction: {{ user.selfIntro }}</v-card-text
                >
              </v-col>
              <v-col>
                <!-- User can change self introduction -->
                <v-btn class="pb-0" @click="changesi = true"
                  >Change self introduction</v-btn
                >
                <v-dialog v-model="changesi" persistent max-width="500">
                  <v-card>
                    <v-card-title class="headline"
                      >Change self introduction</v-card-title
                    >
                    <v-row>
                      <v-col class="col-1"></v-col>
                      <v-col sm="10">
                        <v-text-field
                          label="New self introduction"
                          required
                          v-model="newsi"
                          :rules="selfIntroRules"
                          counter="70"
                          clearable
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-col cols="12" sm="6" md="4"> </v-col>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="secondary"
                        text
                        @click="
                          changesi = false;
                          newsi = null;
                        "
                        >Go back</v-btn
                      >
                      <v-btn color="primary" text @click="updateProfile()"
                        >Yes</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <!-- Warning notification for invalid password changing request -->
            <v-snackbar
              v-model="snackbar"
              :multi-line="multiLine"
              :timeout="5000"
              top
              color="secondary"
            >
              Invalid password changing request!<br />
              (Wrong old password/ non-matching new passwords)
              <v-btn text color="blue lighten-2" @click="snackbar = false">
                Close
              </v-btn>
            </v-snackbar>
            <!-- Warning notification for invalid self introduction -->
            <v-snackbar
              v-model="snackbar_si"
              :multi-line="multiLine"
              :timeout="5000"
              top
              color="secondary"
            >
              Invalid self introduction!
              <v-btn text color="white" @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <!-- Reminder notification for user to complete the form -->
            <v-snackbar
              v-model="reminder"
              :multi-line="multiLine"
              :timeout="3000"
              top
              color="secondary"
            >
              Please complete the form!
              <v-btn text color="blue lighten-2" @click="success = false">
                Close
              </v-btn>
            </v-snackbar>
            <!-- Confirmation notification for user to know their information has been saved -->
            <v-snackbar
              v-model="success"
              :multi-line="multiLine"
              :timeout="3000"
              top
              color="secondary"
            >
              Your information has been saved!
              <v-btn text color="blue lighten-2" @click="success = false">
                Close
              </v-btn>
            </v-snackbar>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { service } from "@/plugins/request_service";
export default {
  name: "Profile",
  data: () => ({
    user: {
      username: "",
      password: "",
      displayName: "",
      email: "",
      year: "",
      major: "",
      college: "",
      selfIntro: ""
    },
    loaded: false,
    changedn: false,
    changesi: false,
    changepw: false,
    snackbar: false,
    reminder: false,
    passwordFieldType: "password",
    passwordRules: [
      // password requirements
      v =>
        (v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      v => (v && v.length > 6) || "Password must be More than 6 characters",
      v => !!v || "Password is required"
    ],
    selfIntroRules: [v => (v && v.length <= 70) || "Maximimum 70 characters"], // self introduction requirement
    success: false,
    multiLine: true,
    newpw: null,
    newdn: null,
    newsi: null,
    repw: null,
    oldpw: null
  }),
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      service
        .get(`/auth/queryAccountInform/${this.$store.state.user["username"]}`)
        .then(res => {
          if (res.data.success) {
            this.user = res.data.data[0];
            this.loaded = true;
          }
        });
    },
    switchVisibility() {
      // allow passwords to be seen or censored
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    updateProfile() {
      console.log(this.newdn);
      if (this.newpw !== this.repw) {
        // new password not the same as reentered new password
        this.snackbar = true;
        return;
      }
      if (this.changedn === true) {
        // change display name
        if (this.newdn === null) {
          // empty field in change display name
          this.reminder = true;
          return;
        } else {
          this.changedn = false;
          this.user.displayName = this.newdn;
        }
      }
      if (this.changepw === true) {
        // change password
        if (this.newpw === null || this.repw === null || this.oldpw === null) {
          // empty field in change password
          this.reminder = true;
          return;
        } else {
          var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
          if (this.user.password.match(reg) == null) {
            // make sure entered passwords fullfill password requirements
            this.newpw = null;
            this.newdn = null;
            this.newsi = null;
            this.repw = null;
            this.oldpw = null;
            this.snackbar = true;
            return;
          }
          this.changepw = false;
          this.user.password = this.newpw;
        }
      }
      if (this.changesi === true) {
        // change self intro
        if (this.newsi === null) {
          // empty field in change self intro
          this.reminder = true;
          return;
        } else {
          var regsi = /^.{1,70}$/;
          if (this.newsi.match(regsi) == null) {
            // make sure entered self introduction is under 70 characters
            this.newsi = null;
            this.snackbar_si = true;
            return;
          }
          this.changesi = false;
          this.user.selfIntro = this.newsi;
        }
        this.newpw = undefined;
        this.newdn = undefined;
        this.newsi = undefined;
        this.repw = undefined;
        service
          .put("/auth/updateProfile", {
            username: this.user.username,
            password: this.user.password,
            displayName: this.user.displayName,
            year: this.user.year,
            major: this.user.major,
            email: this.user.email,
            college: this.user.college,
            selfIntro: this.user.selfIntro
          })
          .then(res => {
            if (res.data.success) {
              console.log("success!");
            }
          });
        this.success = true;
      }
      service
        .put("/auth/updateProfile", {
          // fetch current user information
          username: this.user.username,
          password: this.user.password,
          displayName: this.user.displayName,
          year: this.user.year,
          major: this.user.major,
          email: this.user.email,
          college: this.user.college,
          selfIntro: this.user.selfIntro,
          oldpw: this.oldpw
        })
        .then(res => {
          if (res.data.success) {
            console.log("success!");
            this.success = true;
          }
        })
        .catch(err => {
          // catch error from changing password due to not matching old password
          this.newpw = null;
          this.newdn = null;
          this.newsi = null;
          this.repw = null;
          this.oldpw = null;
          this.snackbar = true;
        });
    }
  }
};
</script>
