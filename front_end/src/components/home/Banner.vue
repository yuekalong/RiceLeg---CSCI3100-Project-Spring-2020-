<template>
  <base-card dark>
    <v-img class="grey lighten-2" height="400" width="100%" :src="src">
      <v-layout fill-height align-center pa-3>
        <v-flex xs12 md7 offset-md5>
          <h1 class="display-3 font-weight-light">{{title}}</h1>
          <div class="subheading text-uppercase pl-2 mb-4">{{subheading}}</div>
        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
</template>

<script>
export default {
  name: "restaurant_display",
  props: ["src", "title", "subheading"],
  components: {},
  data: () => ({
    items: []
  })
};
</script>
