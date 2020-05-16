/*
* MODULE NAME: HOME
* PROGRAMMER: LAM HIU LUI
* VERSION: 1.0 (16 MAY 2020)
*
* PURPOSE: HOME PAGE STRUCTURE OF RICELEG
*/
<template>
  <div id="home" style="background-color: white">
    <v-container style="background-color: white">
      <v-app class="width=100%">
        <!-- Parallax banner for a modern look -->
        <v-parallax
          id="homepage"
          src="@/assets/banner_photo/main2.jpg"
          height="700"
          width="100%"
          jumbotron
        >
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="12">
              <h1 class="display-3 bold mb-3">RICELEG</h1>
              <h4 class="display-1 bold">Modern solution to socialize through meals in CUHK</h4>
            </v-col>
          </v-row>
        </v-parallax>
      </v-app>
      <v-card height="400" flat></v-card>
      <about />
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {
    // import the components we have use in this vue component
    About: () => import("@/components/home/About")
  },
  mounted() {
    // to get the height of the document
    document.getElementById("homepage").style.height = "100vh";
  }
};
</script>
