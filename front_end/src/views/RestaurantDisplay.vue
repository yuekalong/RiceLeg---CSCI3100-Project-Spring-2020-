<template>
  <div id="restaurant_display">
    <v-text-field v-model="id"></v-text-field>
    <v-text-field v-model="name"></v-text-field>
    <v-btn @click="insertData">insert!</v-btn>
  </div>
</template>

<script>
import { service } from "@/plugins/request_service";

export default {
  name: "restaurant_display",
  components: {},
  data: () => ({
    id: "",
    name: ""
  }),
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      service.get("/test/knexTest").then(res => {
        console.log(res);
        if (res.data.success) {
          this.data = res.data.data;
        }
      });
      },
    insertData() {
      service
        .post("/test/insert", {
          id: this.id,
          name: this.name
        })
        .then(res => {
          if (res.data.success) {
            console.log("success!");
          }
        });
    }
  }
};
</script>
