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
    getShowToolBar() {
      return this.$store.state.showToolBar;
    },
    getShowFooter() {
      return this.$store.state.showFooter;
    }
  }
};
</script>


