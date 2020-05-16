/*
 * MODULE NAME: CHATROOM
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS CHATROOM PAGE WHICH PROVIDE THE ENVIRONMENT TO THE PAIRED USERS TO TALK TO EACH OTHER
 *
 */
<!-- This is our Chatroom Page -->
<template>
  <div id="chatroom">
    <!-- set up the container -->
    <v-container grid-list-xl>
      <!-- make a card -->
      <v-card class="secondary">
        <!-- set the card title -->
        <v-card-title class="white--text">
          <h1 class="font-weight-light">Chatroom</h1>
        </v-card-title>
        <div></div>
        <v-card-text class="white text-center">
          <!-- appear a circular loading image if chatroom is not ready -->
          <v-progress-circular
            class="justify-center"
            :size="50"
            v-if="!loaded"
            indeterminate
            color="secondary"
            style="text-align:center;"
          ></v-progress-circular>

          <!-- Make use of ChatroomToolBar component to show the list of room and handle for joining it -->
          <ChatroomToolbar
            v-if="loaded"
            :user="this.$store.state.user"
            @joinedRoom="joinedRoom"
            :listOfRoom="listOfRoom"
          />
          <!-- set the message area -->
          <v-alert
            v-if="loaded"
            height="500px"
            elevation="1"
            color="primary"
            outlined
            class="scroll"
          >
            <!-- date detail button -->
            <v-btn
              v-if="haveRoom"
              style="float:right;"
              outlined
              small
              fab
              color="teal"
              @click="getDateDetail"
            >
              <v-icon>mdi-file-document-box</v-icon>
            </v-btn>

            <!-- showing the history and also the room messages -->
            <div style="float:left; text-align:left;">
              <h3 class="grey--text">{{ roomMessage }}</h3>
              <span
                class="text--disabled"
                v-for="history in history.split('\n')"
                :key="history.index"
              >
                {{ history }}
                <br />
              </span>
              <template v-for="message in message.split('\n')">
                {{ message }}
                <br :key="message" />
              </template>
            </div>
          </v-alert>

          <!-- text input field for inputing the message -->
          <v-text-field
            v-if="loaded"
            :disabled="!haveRoom"
            v-model="newMsg"
            label="Type your message here!"
            outlined
            v-on:keyup.enter="sendMsg"
          />

          <!-- send button -->
          <v-btn v-if="loaded" :disabled="!haveRoom" class="secondary" @click="sendMsg">Send</v-btn>
        </v-card-text>
      </v-card>

      <!-- dialog(pop up window) of date detail -->
      <v-dialog v-model="dialog" max-width="50%">
        <v-card centered height="100%" style="text-align:center;">
          <!-- card title -->
          <v-card-title class="headline justify-center primary--text">Date Detail</v-card-title>
          <!-- date details -->
          <v-card-text pa-3>
            <div class="display-1 py-0 secondary--text font-weight-bold">{{ date.requestName }}</div>
            <div class="subtitle-1 py-0 secondary--text">#{{ date.requestID }}</div>
            <div class="headline py-0 secondary--text font-weight-medium">{{ date.location }}</div>
            <div
              class="headline py-0 secondary--text font-weight-medium"
            >{{ date.date.slice(0, 10) }}</div>
            <div class="headline py-0 secondary--text font-weight-medium">
              {{ date.startingTime.slice(0, 5) }} -
              {{ date.endingTime.slice(0, 5) }}
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import socket from "vue-socket.io";
import ChatroomToolbar from "@/components/chatroom/ChatroomToolbar.vue";
import { service } from "@/plugins/request_service";

export default {
  name: "chatroom",
  components: {
    ChatroomToolbar
  },
  data: () => ({
    message: "", // for storing the message
    history: "", // for storing the history message
    newMsg: "", // for storing the input message
    loaded: false, // variable to help to show finish loading the page or not
    haveRoom: false, // variable to help to show the user got a room or not
    roomMessage: "Please join a room first.", // the room message when joined a room

    // for storing the list of room
    listOfRoom: [
      {
        oppName: "Room 1",
        roomID: "1000"
      },
      {
        oppName: "Room 2",
        roomID: "2000"
      }
    ],
    selectedRoom: null, // for storing the selected room
    dialog: false, // variable to help to show the dialog or not

    // for storing the date detail
    date: {
      requestID: 0,
      requestName: "Hi. Let's eat",
      location: "Paper & Coffee @Chung Chi",
      date: "2020-04-22T16:00:00.000Z",
      startingTime: "13:00:00",
      endingTime: "14:00:00",
      createUser: "test",
      stateVegetarian: 0,
      stateFinish: 0
    }
  }),
  // run the following command when page is load
  mounted() {
    this.getListofRoom();
  },
  sockets: {
    // get the message history
    getHistory(history) {
      this.history = history;
      var chatbox = this.$el.querySelector(".scroll");
      chatbox.scrollTop = chatbox.scrollHeight;
    },
    // get the message
    receiveMsg(receiveMsg) {
      this.message += receiveMsg;
      var chatbox = this.$el.querySelector(".scroll");
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  },
  methods: {
    // get the list of room
    getListofRoom() {
      service
        .get(`/chatroom/getListofRoom/${this.$store.state.user["username"]}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(res => {
          if (res.data.success) {
            // if success
            let temp = res.data.data;
            // storing the response data into the list of room
            this.listOfRoom = temp.map(
              s =>
                (s = {
                  roomID: s.roomID,
                  oppName:
                    s.username_A == this.$store.state.user["username"]
                      ? s.username_B
                      : s.username_A,
                  requestID: s.requestID
                })
            );
            // to enable the chatroom
            this.loaded = true;

            // if number of room is zero
            if (this.listOfRoom.length == 0) {
              this.roomMessage =
                "You have no date at this moment... Maybe you should make a request or send some invitations to get a date";
            }
          }
        });
    },
    // handle to join the room
    joinedRoom(room) {
      this.haveRoom = true;
      this.roomMessage = `You have joined ${room.oppName}'s room`;
      this.message = "";
      this.selectedRoom = room;
    },
    // handle to send message
    sendMsg() {
      // emit the message to the back-end socket
      this.$socket.emit("sendMsg", this.$store.state.user, this.newMsg);
      this.newMsg = "";
    },
    // to get the date detail
    getDateDetail() {
      service
        .get(`/chatroom/getDateDetail/${this.selectedRoom.requestID}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(res => {
          if (res.data.success) {
            // assign the date detail
            this.date = res.data.data;
            this.dialog = true;
          }
        });
    }
  },
  // before joining this page, connect the socket in back-end
  beforeRouteEnter(to, from, next) {
    if (!Vue.prototype.$socket) {
      Vue.use(
        new socket({
          debug: true,
          connection: "http://localhost:3000", //process.env.VUE_APP_BACKEND,
          vuex: {}
        })
      );
    }
    next();
  },
  // before leaving this page, disconnect the socket in back-end
  beforeRouteLeave(to, from, next) {
    this.$socket.emit("leavePage", this.$store.state.user);
    delete Vue.prototype.$socket;
    next();
  }
};
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
}
</style>
