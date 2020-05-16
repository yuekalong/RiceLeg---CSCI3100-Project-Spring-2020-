/*
 * MODULE NAME: MYREQUEST
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE MYQUEST PAGE WHICH HELPS TO HANDLE THE REQUESTS CREATED BY THE OWNER
 *
 */
<template>
  <v-row no-gutters>
    <v-col
      v-for="object in listOfRequest"
      :key="object.requestID"
      cols="12"
      sm="6"
    >
      <v-card class="ma-3" centered min-height="300px">
        <div>
          <v-img
            class="white--text align-end dark"
            height="200px"
            src="@/assets/matching_photo/meal_1.jpg"
            gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4)"
          >
            <v-card-title>{{ object.requestName }}</v-card-title>
          </v-img>
        </div>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <MyInvitation :requestID="object.requestID" @refresh="refresh" />
        </v-card-actions>
      </v-card>
    </v-col>
    <v-snackbar color="secondary" v-model="snackbar" :multi-line="multiLine" :timeout="2500" top>
      Accepted! Quick chat with your new friend in Chatroom!
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-row>
</template>
<script>
import { service } from "@/plugins/request_service";
import MyInvitation from "@/components/matching/MyInvitation";
import moment from "moment-timezone";

export default {
  components: {
    MyInvitation
  },
  data: () => ({
    listOfRequest: [],
    snackbar: false,
    multiLine: true
  }),
  mounted() {
    this.getListOfRequest();
  },
  methods: {
    // get the list of request created by the user
    getListOfRequest() {
      // send the request to back-end to get the informations
      service
        .get(`/matching/getRequest/${this.$store.state.user.username}`)
        .then(res => {
          if (res.data.success) {
            let temp = res.data.data;
            this.listOfRequest = temp.map(
              s =>
                (s = {
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
    // refresh the page
    refresh() {
      this.snackbar = true;
      this.getListOfRequest();
    }
  }
};
</script>
