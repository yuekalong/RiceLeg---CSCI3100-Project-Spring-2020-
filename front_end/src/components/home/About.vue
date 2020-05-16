/*
* COMPONENT NAME: ABOUT
* PROGRAMMER: LAM HIU LUI
* VERSION: 1.0 (16 MAY 2020)
*
* PURPOSE: TO PROVIDE A BRIEF INTRODUCTION OF RICELEG ON THE HOMEPAGE
*/

<template>
<!-- To introduce people what RiceLeg is about and our functions -->
  <v-card id="about" tag="section" flat>
    <!-- title question -->
    <v-card class="display-4 bold mb-3" flat>
      <p style="color:#FFB6D0">Who are we?</p>
    </v-card>
    <!-- spacing helper -->
    <v-card height="100" flat></v-card>
    <!-- answer -->
    <v-card class="display-3 bold mb-3" flat>
      <p style="color:#576066">
        RiceLeg is a social web application that helps CUHK students to find new
        friends during meal times.
      </p>
    </v-card>
    <v-card height="300" flat></v-card>
    <!-- parallax banner for distinguishing messages and modern style -->
    <v-parallax
      id="homepage"
      src="@/assets/banner_photo/social.jpg"
      height="900"
      width="700"
      jumbotron
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-3 bold mb-3">You can...</h1>
          <h4 class="display-1 bold">
            Match, Chat, Eat with your new friends.
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-card height="300" flat></v-card>
    <v-card class="display-3 bold mb-3" flat>
      <p style="color:#576066">
        You can also browse restaurant details and ratings of CUHK restaurants.
      </p>
    </v-card>
    <v-card height="400" flat></v-card>
    <v-card class="display-3 bold mb-3" flat>
      <p style="color:#FFB6D0">Let's start your experience in RiceLeg.</p>
      <v-card height="50" flat></v-card>
      <v-row>
        <v-spacer></v-spacer>
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          center
          height="500"
          width="100%"
          max-width="500"
          @click="$vuetify.goTo(0)"
        />
        <v-spacer></v-spacer>
      </v-row>
    </v-card>
    <v-card height="100" flat></v-card>
  </v-card>
</template>
