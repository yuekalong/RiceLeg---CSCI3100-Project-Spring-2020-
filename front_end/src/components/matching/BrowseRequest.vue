/*
* COMPONENT NAME: BROWSE_REQUEST
* PROGRAMMER: LAM HIU LUI
* VERSION: 1.0 (16 MAY 2020)
*
* PURPOSE: BROWSE REQUEST TAB ON THE MATCHING PAGE
*          PROVIDE BROWSING REQUESTS AND SENDING INVITATION FUNCTIONS.
*/
<template>
  <v-row no-gutters>
    <v-col
      v-for="object in listOfRequest"
      :key="object.requestID"
      cols="12"
      sm="4"
    >
      <v-card class="ma-3" centered min-height="500px">
        <!-- Image for vegetarian request -->
        <v-img
          v-if="object.stateVegetarian == 1"    
          class="white--text align-end dark"
          height="200px"
          src="@/assets/matching_photo/cuhk_veggie_can.jpg"
          gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4)"
        >
          <v-card-title>{{ object.requestName }}</v-card-title>
        </v-img>
        <!-- Image for non-vegetarian request -->
        <v-img
          v-else
          class="white--text align-end dark"
          height="200px"
          src="@/assets/matching_photo/meal_1.jpg"
          gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4)"
        >
          <v-card-title>{{ object.requestName }}</v-card-title>
        </v-img>
        <!-- Structure of a request card -->
        <v-card-text pa-3>
          <div class="subtitle-1 py-0 black--text">
            Request number: {{ object.requestID }}
          </div>
          <div class="subtitle-1 py-0">Location: {{ object.location }}</div>
          <div class="subtitle-1 py-0">
            Date: {{ object.date.slice(0, 10) }}
          </div>
          <div class="subtitle-1 py-0">
            Time: {{ object.startingTime.slice(0, 5) }} -
            {{ object.endingTime.slice(0, 5) }}
          </div>
          <div class="subtitle-1 py-0">Major: {{ object.major }}</div>
          <div class="subtitle-1 py-0">Year: {{ object.year }}</div>
          <div class="subtitle-1 py-0" style="word-break: break-all;">
            {{ object.selfIntro }}
          </div>
        </v-card-text>
        <!-- Request creator cannot send invitation to himself/herself -->
        <v-card-actions>
          <v-btn
            v-if="object.createUser != $store.state.user.username"
            style="position: absolute; bottom:   0;"
            color="primary"
            text
            @click="openDialog(object)"
            >Send Invitation</v-btn
          >
          <!-- Pop-up to reconfirm send invitation -->
          <v-dialog v-model="send" persistent max-width="500">
            <v-card>
              <v-card-title class="headline"
                >Are you sure to send an invitation?</v-card-title
              >
              <v-card-text
                >You can't delete your invitation after the invitation has been
                accepted.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="send = false"
                  >Go back</v-btn
                >
                <v-btn color="primary" text @click="insertInvite()">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
        <!-- Notification for sent invitations -->
        <v-snackbar
          color="secondary"
          v-model="snackbar"
          :multi-line="multiLine"
          :timeout="2500"
          top
        >
          Your invitation has been sent!
          <v-btn text color="white" @click="snackbar = false"
            >Close</v-btn
          >
        </v-snackbar>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { service } from "@/plugins/request_service";
import moment from "moment-timezone";
export default {
  data: () => ({
    multiLine: true,
    snackbar: false,
    send: false,
    listOfRequest: [],
    selectedRequestID: null
  }),
  mounted() {
    this.getListOfRequest();
  },
  methods: {
    getListOfRequest() {
      service.get("/matching/requestlist").then(res => {
        if (res.data.success) {
          let temp = res.data.data;
          this.listOfRequest = temp.map(
            s =>
              (s = {    // fetching request information from database
                requestID: s.requestID,
                createUser: s.createUser,
                requestName: s.requestName,
                location: s.location,
                date: moment(s.date)
                  .tz("Asia/Hong_Kong")
                  .format("YYYY-MM-DD"),
                startingTime: s.startingTime,
                endingTime: s.endingTime,
                major: s.major,
                year: s.year,
                selfIntro: s.selfIntro,
                stateVegetarian: s.stateVegetarian
              })
          );
        }
      });
    },
    openDialog(object) {  // fetching selected request ID
      this.send = true;
      this.selectedRequestID = object.requestID;
    },
    insertInvite() {    // insert invitation row to database
      service
        .post("/matching/sendInvitation", {
          requestID: this.selectedRequestID,
          inviteUser: this.$store.state.user.username
        })
        .then(res => {
          if (res.data.success) {
            this.send = false;
            this.snackbar = true;
          }
        });
    }
  }
};
</script>
