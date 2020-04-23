<template>
  <v-bottom-navigation dark grow :value="activeRoom" background-color="primary">
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
    activeRoom: 0
  }),
  methods: {
    joinRoom(room) {
      this.$socket.emit("joinRoom", this.user, room.roomID);
      this.activeRoom = room.roomID;
      this.$emit("joinedRoom", room);
    }
  }
};
</script>
