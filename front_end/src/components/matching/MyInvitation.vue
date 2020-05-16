/*
 * MODULE NAME: MYINVITATION
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE MYINVITATION PAGE WHICH IS THE DIALOG(POP-UP) WINDOW 
 *          THAT AFTER CLICK THE REQUEST ON MYREQUEST PAGE
 *
 */
<template>
  <div>
    <v-btn color="primary" text @click="fetchData">View Invitations</v-btn>
    <v-dialog v-model="dialog" max-width="80%">
      <v-card width="100%" height="100%">
        <v-card-title class="headline secondary--text">Invitations</v-card-title>
        <v-row no-gutters>
          <v-col v-if="invitations.length == 0">
            <v-card-title
              class="justify-center headline primary--text"
            >No invitation yet, please wait...</v-card-title>
          </v-col>
          <v-col
            v-for="object in invitations"
            :key="object.invitationID"
            cols="12"
            sm="6"
            class="hidden-sm-and-down"
          >
            <v-card outlined class="ma-3" centered min-height="90%">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    class="display-1 text-uppercase my-0 py-1 primary--text"
                  >{{ object.displayName }}</v-list-item-title>
                  <div class="headline px-5 secondary--text">Year {{ object.year }}</div>
                  <div class="headline px-5 secondary--text">{{ object.major }}</div>
                  <div class="headline px-5 secondary--text">{{ object.college }}</div>
                  <div
                    class="subtitle-1 px-5 secondary--text"
                    style="word-break: break-all;"
                  >{{ object.selfIntro }}</div>
                </v-list-item-content>
                <v-list-item-avatar tile size="175" color="grey">
                  <v-img
                    class="white--text align-end dark"
                    src="@/assets/matching_photo/meal_1.jpg"
                    gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4)"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn outlined color="green" @click="openConfirmDialog(object)">Accept!</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col
            v-for="object in invitations"
            :key="object.invitationID"
            cols="12"
            sm="6"
            class="hidden-md-and-up"
          >
            <v-card outlined class="ma-3" centered min-height="90%">
              <v-img
                class="white--text align-end dark"
                src="@/assets/matching_photo/meal_1.jpg"
                gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4)"
              ></v-img>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    class="display-1 text-uppercase my-0 py-1 primary--text"
                  >{{ object.displayName }}</v-list-item-title>
                  <div class="headline px-5 secondary--text">Year {{ object.year }}</div>
                  <div class="headline px-5 secondary--text">{{ object.major }}</div>
                  <div class="headline px-5 secondary--text">{{ object.college }}</div>
                  <div
                    class="subtitle-1 px-5 secondary--text"
                    style="word-break: break-all;"
                  >{{ object.selfIntro }}</div>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn outlined color="green" @click="openConfirmDialog(object)">Accept!</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDialog" max-width="50%">
      <v-card width="100%" height="100%" style="text-align:center;">
        <v-card-title class="headline justify-center">
          Are you sure to accept
          {{ selectedUser.displayName }} invitation?
        </v-card-title>
        <v-card-text>
          You can't accept other invitation once you accept this
          one.
        </v-card-text>
        <v-btn color="secondary" text @click="confirmDialog = false">Go back</v-btn>
        <v-btn color="primary" text @click="acceptInvite()">Yes</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { service } from "@/plugins/request_service";

export default {
  props: ["requestID"], // get the requestID from myRequest
  data: () => ({
    dialog: false, //dialog boolean for popup or not
    // the header of the card
    headers: [
      { text: "Display Name", value: "displayName" },
      { text: "Year", value: "year" },
      { text: "Major", value: "major" },
      { text: "College", value: "college" },
      { text: "Self Introduction", value: "selfIntro" }
    ],
    invitations: [], // the invitations
    confirmDialog: false, //confirm dialog boolean for popup or not
    selectedUser: "" // selected user information
  }),
  methods: {
    // get the invitation
    fetchData() {
      service.get(`/matching/getInvitation/${this.requestID}`).then(res => {
        if (res.data.success) {
          this.invitations = res.data.data;
          this.dialog = true;
        }
      });
    },
    // open the dialog
    openConfirmDialog(object) {
      this.dialog = false;
      this.selectedUser = object;
      this.confirmDialog = true;
    },
    // accept the invitation
    acceptInvite() {
      const info = {
        username_A: this.$store.state.user.username,
        username_B: this.selectedUser.username,
        requestID: this.selectedUser.requestID
      };
      service
        .post("/matching/acceptInvitation", {
          info: JSON.stringify(info) // pass the information into back-end by using body of the request
        })
        .then(res => {
          if (res.data.success) {
            this.confirmDialog = false;
            this.$emit("refresh"); //emit to parent myRequest to refresh
          }
        });
    }
  }
};
</script>
