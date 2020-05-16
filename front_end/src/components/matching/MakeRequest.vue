/* * COMPONENT NAME: MAKE A REQUEST * PROGRAMMER: Wong Kin Chi * VERSION: 1.0
(16 MAY 2020) * * PURPOSE: MAKE A REQUEST FORM FOR MAKING REQUEST * AND UPLOAD
THE REQUEST DATA TO DATABASE */
<template>
  <v-form ref="form" v-model="valid">
    <!-- // make request from -->
    <v-text-field
      v-model="name"
      :counter="30"
      :rules="nameRules"
      label="Name of Request (example: A Wonderful Night)"
      required
    ></v-text-field>
    <!-- // get request name -->
    <v-row>
      <v-col cols="6" lg="6">
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290pzx"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              readonly
              required
              :rules="[v => !!v || 'Date is required']"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="date"
            no-title
            :min="currentdate"
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <!-- get dating date -->
    <v-row>
      <v-col sm="5">
        <v-dialog
          ref="start"
          v-model="modal"
          :return-value.sync="start"
          width="500px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="start"
              label="Starting Time"
              required
              :rules="[v => !!v || 'Starting Time is required']"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal"
            @click="resetEnd"
            v-model="start"
            :landscape="$vuetify.breakpoint.mdAndUp"
            full-width
            :max="end"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetStart">Reset</v-btn>
            <v-btn text color="primary" @click="$refs.start.save(start)"
              >OK</v-btn
            >
          </v-time-picker>
        </v-dialog>
      </v-col>
      <!-- // get starting time -->
      <v-col sm="5">
        <v-dialog
          ref="end"
          v-model="modal2"
          :return-value.sync="end"
          width="500px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="end"
              label="Ending Time"
              required
              :rules="[v => !!v || 'Ending Time is required']"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal2"
            v-model="end"
            full-width
            :landscape="$vuetify.breakpoint.mdAndUp"
            :min="start"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetEnd">Reset</v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.end.save(end)"
              :rules="[v => !!v || 'Location is required']"
              >OK</v-btn
            >
          </v-time-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <!-- // get ending time -->
    <v-select
      v-model="location"
      :items="locationlist"
      :rules="[v => !!v || 'Location is required']"
      label="Location"
      required
    ></v-select>
    <!-- // get location -->
    <v-checkbox
      color="green darken-2"
      v-model="state"
      label="Are you a vegetarian?"
    ></v-checkbox>
    <!-- check whether user is vegetarian -->
    <v-row>
      <v-col cols="6" lg="6">
        <v-btn
          color="primary"
          class="mr-4"
          v-if="valid == false"
          @click="validate"
          v-on="on"
          >Confirm</v-btn
        >
        <!-- //check the if there is missing input -->
        <v-btn
          color="primary"
          class="mr-4"
          v-if="valid == true"
          @click="insertData"
          v-on="on"
          >Confirm</v-btn
        >
        <!-- upload request date to database -->
        <v-btn color="secondary" class="mr-4" @click="reset">Reset Form</v-btn>
        <v-dialog v-model="pop" max-width="500">
          <v-card>
            <v-card-title class="headline">Request Sent</v-card-title>

            <v-card-text>
              Hope you have a Wonderful Meal
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text v-on:click="gotosite()">
                Check Restaurant
              </v-btn>

              <v-btn color="green darken-1" text v-on:click="gotorequest()">
                Browse Request
              </v-btn>

              <v-btn color="green darken-1" text @click="pop = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { service } from "@/plugins/request_service";

export default {
  data: () => ({
    valid: false,
    start: null,
    end: null,
    menu1: false,
    modal: false,
    pop: false,
    modal2: false,
    currentdate: new Date().toISOString().substr(0, 10),
    date: null,
    name: "",
    user: "Charlie",
    nameRules: [
      v => !!v || "Request Name is required",
      v =>
        (v && v.length <= 30) || "Request Name must be less than 30 characters"
    ],
    location: null,
    state: false,
    locationlist: [
      "Basic Medical Sciences Building Snack Bar",
      "BFC Coffee Corner",
      "BFC Staff Canteen",
      "BFC Student Canteen",
      "BFC Vegetarian Food Shop",
      "LSK Building Coffee Shop",
      "Women Cooperative Store",
      "CC College Staff Club",
      "CC College Student Canteen",
      "Li Wai Chun Building Café",
      "Orchid Lodge",
      "Paper&Coffee",
      "Ebeneezer's Kebabs & Pizzeria",
      "NA College Staff Canteen",
      "NA College Student Canteen",
      "NA College Yun Chi Hsien",
      "UC Staff Canteen",
      "UC Staff Common Room",
      "UCStudent Canteen",
      "UC Si Yuan Amenities Centre",
      "Staff Common Room Clubhouse",
      "SeeYou@Shaw (with Café)",
      "Morningside College Dining Hall",
      "Morningside College Café",
      "Canteen of S.H. Ho College(with Café)",
      "Connexion",
      "S.H. Ho College Café",
      "Canteen of CW Chu College",
      "WYS College Student Canteen",
      "WYS College Staff Dining Room",
      "LWS College - WS Pavilion",
      "LWS  College - The Harmony",
      "LWS  College - Cafe Tolo",
      "LWS  College - The Green",
      "The Stage",
      "Café 330"
    ],
    dateFormatted: null
  }),

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  mounted() {},
  methods: {
    gotosite() {
      window.location.href = "http://localhost:8080/restaurant";
    },
    gotorequest() {
      window.location.href = "http://localhost:8080/matching";
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetStart() {
      this.start = null;
    },
    resetEnd() {
      this.end = null;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    insertData() {
      service
        .post("/matching/insertRequestInfo", {
          name: this.name,
          location: this.location,
          date: this.date,
          start: this.start,
          end: this.end,
          user: this.$store.state.user.username,
          state: this.state
        })
        .then(res => {
          if (res.data.success) {
            console.log("success!");
          }
        });

      this.pop = true;
    }
  }
};
</script>
