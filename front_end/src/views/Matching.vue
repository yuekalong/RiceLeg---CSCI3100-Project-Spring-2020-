<template>
  <v-container grid-list-xl>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="white accent-1"
        slider-color="primary"
        text="black"
      >
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="pa-8">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card v-if="item.tab == 'Make a Request'" flat width="800">
            <MakeRequest />
          </v-card>

          <v-card v-if="item.tab == 'Browse Requests'" flat width="1200">
            <BrowseRequest />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import BrowseRequest from "@/components/matching/BrowseRequest.vue";
import MakeRequest from "@/components/matching/MakeRequest.vue";

export default {
  name: "matching",
  components: {
    BrowseRequest,
    MakeRequest
  },
  data: () => ({
    tab: null,
    items: [{ tab: "Make a Request" }, { tab: "Browse Requests" }]
  })
};
</script>
