<template>
  <div id="chatroom">
    <v-container grid-list-xl>
      <v-card class="primary">
        <v-card-title class="white--text">
          <h1>Chatroom</h1>
        </v-card-title>
        <div></div>
        <v-card-text class="white">
          <v-text-field
            v-model="username"
            :disabled="haveRoom"
            label="Type your name here!"
            outlined
          />
          <ChatroomToolbar
            v-if="user.name != null"
            :user="user"
            @joinedRoom="joinedRoom"
            :listOfRoom="listOfRoom"
          />
          <v-alert height="500px" elevation="1" color="primary" outlined>
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
              
            </template>
          </v-alert>
          <v-text-field
            :disabled="user.name == null"
            v-model="newMsg"
            label="Type your message here!"
            outlined
            v-on:keyup.enter="sendMsg"
          />
          <v-btn :disabled="!haveRoom" class="secondary" @click="sendMsg">Send</v-btn>
        </v-card-text>
      </v-card>
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
    username: "long",
    user: {
      name: "long"
    },
    haveRoom: false,
    roomMessage: "Please input your name and join a room first.",
    listOfRoom: [
      {
        oppName: "Room 1",
        roomID: "1000"
      },
      {
        oppName: "Room 2",
        roomID: "2000"
      }
    ]
  }),
  mounted() {
    this.getListofRoom();
  },
  sockets: {
    getHistory(history) {
      this.history = history;
    },
    receiveMsg(receiveMsg) {
      this.message += receiveMsg;
    },
    leaveRoom(leaveMsg) {
      this.message += leaveMsg;
    }
  },
  methods: {
    getListofRoom() {
      service.get(`/chatroom/getListofRoom/${this.user["name"]}`).then(res => {
        if (res.data.success) {
          let temp = res.data.data;
          this.listOfRoom = temp.map(
            s =>
              (s = {
                roomID: s.roomID,
                oppName:
                  s.username_A == this.user["name"]
                    ? s.username_B
                    : s.username_A
              })
          );
        }
      });
    },
    joinedRoom(oppName) {
      this.haveRoom = true;
      this.roomMessage = `You have joined ${oppName}'s room`;
      this.message = "";
    },
    sendMsg() {
      this.$socket.emit("sendMsg", this.user, this.newMsg);
      this.newMsg = "";
    }
  },
  watch: {
    username: function() {
      this.user.name = this.username;
      this.getListofRoom();
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!Vue.prototype.$socket) {
      Vue.use(
        new socket({
          debug: true,
          connection: "http://localhost:3000",
          vuex: {}
        })
      );
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      this.$socket.emit("leavePage", this.user);
      delete Vue.prototype.$socket;
      next();
    } else {
      next(false);
    }
  }
};
</script>
