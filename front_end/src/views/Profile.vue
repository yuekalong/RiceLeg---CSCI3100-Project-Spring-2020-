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
                <v-btn class="pb-0" @click="changedn = true"
                  >Change display name</v-btn
                >
                <v-dialog v-model="changedn" persistent max-width="500">
                  <v-card width="100%">
                    <v-card-title class="headline"
                      >Change display name</v-card-title
                    >
                    <v-card-text>
                      <v-text-field
                        label="New display name"
                        required
                        v-model="newdn"
                        clearable
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" text @click="changedn = false"
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
                <v-btn class="pb-0" @click="changepw = true"
                  >Change password</v-btn
                >
                <v-dialog v-model="changepw" persistent max-width="500">
                  <v-card width="100%">
                    <v-card-title class="headline"
                      >Change password</v-card-title
                    >
                    <v-card-text>
                      <v-text-field
                        label="Old password"
                        required
                        v-model="oldpw"
                        :rules="passwordRules"
                        :type="passwordFieldType"
                        clearable
                      ></v-text-field>
                      <v-text-field
                        label="New password"
                        required
                        v-model="newpw"
                        :rules="passwordRules"
                        :type="passwordFieldType"
                        clearable
                      ></v-text-field>
                      <v-text-field
                        label="Re-enter password"
                        required
                        v-model="repw"
                        :rules="passwordRules"
                        :type="passwordFieldType"
                        clearable
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        type="password"
                        @click="switchVisibility"
                        text
                        small
                      >
                        <v-icon>fas fa-eye</v-icon>
                      </v-btn>
                      <v-btn color="secondary" text @click="changepw = false"
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
                <v-btn class="pb-0" @click="changesi = true"
                  >Change self introduction</v-btn
                >
                <v-dialog v-model="changesi" persistent max-width="500">
                  <v-card>
                    <v-card-title class="headline"
                      >Change self introduction</v-card-title
                    >
                    <v-card-text>
                      <v-text-field
                        label="New self introduction"
                        required
                        v-model="newsi"
                        :rules="selfIntroRules"
                        counter="70"
                        clearable
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" text @click="changesi = false"
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
            <v-snackbar
              v-model="snackbar"
              :multi-line="multiLine"
              :timeout="5000"
              top
              color="secondary"
            >
              Invalid password changing request!
              <br />(Wrong old password/ non-matching new passwords)
              <v-btn text color="white" @click="snackbar = false">Close</v-btn>
            </v-snackbar>

            <v-snackbar
              v-model="reminder"
              :multi-line="multiLine"
              :timeout="3000"
              top
              color="secondary"
            >
              Please complete the form!
              <v-btn text color="white" @click="success = false">Close</v-btn>
            </v-snackbar>
            <v-snackbar
              v-model="success"
              :multi-line="multiLine"
              :timeout="3000"
              top
              color="secondary"
            >
              Your information has been saved!
              <v-btn text color="white" @click="success = false">Close</v-btn>
            </v-snackbar>

            <!-- <v-text-field v-model="user.password" label="Password" outlined shaped></v-text-field> -->
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
      v =>
        (v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      v => (v && v.length > 6) || "Password must be More than 6 characters",
      v => !!v || "Password is required"
    ],
    selfIntroRules: [v => (v && v.length <= 70) || "Maximimum 70 characters"],
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
          this.changesi = false;
          this.user.selfIntro = this.newsi;
        }
      }

      var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
      if (this.user.password.match(reg) == null) {
        this.newpw = null;
        this.newdn = null;
        this.newsi = null;
        this.repw = null;
        this.oldpw = null;
        this.snackbar = true;
        return;
      }

      service
        .put("/auth/updateProfile", {
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
