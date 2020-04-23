<template>
  <div id="home" style="background-color: white">
    <v-container style="background-color: white">
      <v-app class="width=100%">
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
              <h4 class="display-1 bold">
                Modern solution to socialize through meals in CUHK
              </h4>
            </v-col>
          </v-row>
        </v-parallax>
      </v-app>
      <!-- <banner
        :src="require('@/assets/banner_photo/home_page.jpg')"
        :title="'RICELEG'"
        :subheading="'Modern solution to socialize through meals in CUHK'"
      /> -->
      <v-card height="400" flat></v-card>
      <about />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    About: () => import("@/components/home/About")
    // Banner: () => import('@/components/home/Banner')
  },
  mounted() {
    document.getElementById("homepage").style.height = "100vh";
  }
};
</script>
