<template>
  <div id="chatroom">
    <v-container grid-list-xl>
      <v-card class="secondary">
        <v-card-title class="white--text">
          <h1 class="font-weight-light">Chatroom</h1>
        </v-card-title>
        <div></div>
        <v-card-text class="white text-center">
          <v-progress-circular
            class="justify-center"
            :size="50"
            v-if="!loaded"
            indeterminate
            color="secondary"
            style="text-align:center;"
          ></v-progress-circular>
          <ChatroomToolbar
            v-if="loaded"
            :user="this.$store.state.user"
            @joinedRoom="joinedRoom"
            :listOfRoom="listOfRoom"
          />
          <v-alert
            v-if="loaded"
            height="500px"
            elevation="1"
            color="primary"
            outlined
            class="scroll"
          >
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
                <br />
              </template>
            </div>
          </v-alert>
          <v-text-field
            v-if="loaded"
            :disabled="!haveRoom"
            v-model="newMsg"
            label="Type your message here!"
            outlined
            v-on:keyup.enter="sendMsg"
          />
          <v-btn v-if="loaded" :disabled="!haveRoom" class="secondary" @click="sendMsg">Send</v-btn>
        </v-card-text>
      </v-card>
      <v-dialog v-model="dialog" max-width="50%">
        <v-card centered height="100%" style="text-align:center;">
          <v-card-title class="headline justify-center primary--text">Date Detail</v-card-title>
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
    message: "",
    history: "",
    newMsg: "",
    loaded: false,
    haveRoom: false,
    roomMessage: "Please join a room first.",
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
    selectedRoom: null,
    dialog: false,
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
  mounted() {
    this.getListofRoom();
  },
  sockets: {
    getHistory(history) {
      this.history = history;
      var chatbox = this.$el.querySelector(".scroll");
      chatbox.scrollTop = chatbox.scrollHeight;
    },
    receiveMsg(receiveMsg) {
      this.message += receiveMsg;
      var chatbox = this.$el.querySelector(".scroll");
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  },
  methods: {
    getListofRoom() {
      service
        .get(`/chatroom/getListofRoom/${this.$store.state.user["username"]}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(res => {
          if (res.data.success) {
            let temp = res.data.data;
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
            this.loaded = true;
            if (this.listOfRoom.length == 0) {
              this.roomMessage =
                "You have no date at this moment... Maybe you should make a request or send some invitations to get a date";
            }
          }
        });
    },
    joinedRoom(room) {
      this.haveRoom = true;
      this.roomMessage = `You have joined ${room.oppName}'s room`;
      this.message = "";
      this.selectedRoom = room;
    },
    sendMsg() {
      this.$socket.emit("sendMsg", this.$store.state.user, this.newMsg);
      this.newMsg = "";
    },
    getDateDetail() {
      service
        .get(`/chatroom/getDateDetail/${this.selectedRoom.requestID}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(res => {
          if (res.data.success) {
            this.date = res.data.data;
            this.dialog = true;
          }
        });
    }
  },
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
