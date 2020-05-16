/*
 * MODULE NAME: APP
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS OUTEST SHELL OF OUR APPLICATION, HELP TO CONTROL THE TOOLBAR, VIEW AND THE FOOTER
 *
 */
<template>
  <v-app>
    <core-toolbar v-if="getShowToolBar()" />

    <core-view />

    <core-footer v-if="getShowFooter()" />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    // import the components we have use in this vue component
    CoreFooter: () => import("@/components/core/Footer"),
    CoreToolbar: () => import("@/components/core/Toolbar"),
    CoreView: () => import("@/components/core/View")
  },
  data() {
    return {
      //
    };
  },
  methods: {
    // check the page required to show toolbar or not
    getShowToolBar() {
      return this.$store.state.showToolBar;
    },
    // check the page required to show footer or not
    getShowFooter() {
      return this.$store.state.showFooter;
    }
  }
};
</script>


