<template>
  <div id="home">
    <v-container grid-list-xl>
      <banner
        :src="require('@/assets/banner_photo/home_page.jpg')"
        :title="'RICELEG'"
        :subheading="'Solution for finding a friend to eat with you'"
      />

      <about />

      <subscribe />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {
    About: () => import("@/components/home/About"),
    Banner: () => import("@/components/home/Banner"),
    Subscribe: () => import("@/components/home/Subscribe")
  }
};
</script>
