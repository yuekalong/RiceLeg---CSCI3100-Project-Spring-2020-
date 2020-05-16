/*
 * MODULE NAME: CHATROOMTOOLBAR
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE CHATROOM TOOLBAR WHICH SHOW THE LIST OF ROOM AND LET THE USER JOIN THE ROOM THEY WANT
 *          
 *
 */
<!-- This is the component of the Chatroom toolbar -->
<template>
  <v-bottom-navigation dark grow :value="activeRoom" background-color="primary">
    <!-- load a button for each room -->
    <v-btn
      v-for="(room, i) in listOfRoom"
      class="primary font--white font-weight-light subtitle-1"
      :key="i"
      :value="room.roomID"
      @click="joinRoom(room)"
    >{{ room.oppName }}</v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  name: "ChatroomToolbar",
  props: ["user", "listOfRoom"],
  data: () => ({
    activeRoom: 0 //store the active room number
  }),
  methods: {
    // handle the join room request
    joinRoom(room) {
      // emit a signal to back-end to join the room
      this.$socket.emit("joinRoom", this.user, room.roomID);
      this.activeRoom = room.roomID; //assign the active room number be the roomID
      this.$emit("joinedRoom", room); //send back the signal to the parent component 'Chatroom'
    }
  }
};
</script>
