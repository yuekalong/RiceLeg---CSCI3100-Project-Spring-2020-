<template>
  <v-footer class="py-4" dark height="auto">
    <v-container mx-auto>
      <v-layout wrap>
        <v-flex xs9>
          <div>
            <h3>Created By</h3>
            <br />Yue Ka Long [1155110560]
            <br />Wong Kin Chi [1155109665]
            <br />Tu Chen Hsien [1155108479]
            <br />Lam Hiu Lui [1155109098]
            <br />Lau Ping Tung [1155111034]
          </div>
        </v-flex>
        <v-spacer />
      </v-layout>
      <base-btn
        style="float: right; "
        class="mr-0"
        square
        title="Go to top"
        @click="$vuetify.goTo(0)"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </base-btn>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({})
};
</script>
