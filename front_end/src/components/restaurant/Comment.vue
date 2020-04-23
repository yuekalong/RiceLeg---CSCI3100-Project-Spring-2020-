<template>
  <div>
    <v-btn outlined color="secondary" @click="openDialog">View More</v-btn>
    <v-dialog v-model="dialog" max-width="80%">
      <v-card>
        <v-card-title class="headline secondary--text justify-center">Comment and Rating</v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="item in feedback" :key="item.id" cols="12" sm="3">
              <v-card
                outlined
                class="ma-3"
                centered
                min-height="90%"
                style="text-align:center; border: 1px solid #FFB6D0;"
              >
                <v-rating :value="parseInt(item.rating)" readonly></v-rating>
                <v-card-text class="secondary--text headline">{{ item.opinion }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card
            outlined
            class="mx-auto"
            centered
            min-height="90%"
            style="text-align:center; border: 1px solid #FFB6D0;"
            max-width="600px"
          >
            <v-card-title
              class="justify-center secondary--text headline"
            >Leave your comment and rating!</v-card-title>
            <v-card-text>
              <div class="red--text subtitle-1">{{ this.warning }}</div>
              <v-rating v-model="newRating"></v-rating>
              <v-textarea
                v-model="newComment"
                counter="250"
                maxlength="250"
                outlined
                label="Comment"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn outlined color="blue" @click="sendFeedback">Submit</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar color="secondary" v-model="snackbar" :multi-line="multiLine" :timeout="2500" top>
      Your comment has been sent!
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { service } from "@/plugins/request_service";

export default {
  props: ["restaurantName"],
  data: () => ({
    dialog: false,
    feedback: [],
    newRating: null,
    newComment: "",
    warning: "",
    snackbar: false,
    multiLine: true
  }),
  methods: {
    openDialog() {
      this.dialog = true;
      service.get(`/restaurant/getComment/${this.restaurantName}`).then(res => {
        if (res.data.success) {
          this.feedback = res.data.data;
        }
      });
    },
    sendFeedback() {
      if (this.newRating > 0 && this.newComment.length > 0) {
        const obj = {
          restaurantName: this.restaurantName,
          opinion: this.newComment,
          rating: this.newRating
        };
        service
          .post(`/restaurant/commentAndRating`, {
            obj: JSON.stringify(obj)
          })
          .then(res => {
            if (res.data.success) {
              this.dialog = false;
              this.snackbar = true;
            }
          });
      } else {
        this.warning = "Rating or Comment cannot be null!";
      }
    }
  },
  watch: {
    newRating() {
      this.warning = "";
    },
    newComment() {
      this.warning = "";
    }
  }
};
</script>

<style></style>
