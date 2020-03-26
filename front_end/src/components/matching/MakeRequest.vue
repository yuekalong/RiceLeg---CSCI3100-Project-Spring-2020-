<template>
  <v-form ref="form">
    <v-text-field
      v-model="name"
      :counter="30"
      :rules="nameRules"
      label="Name of Request (example: A Wonderful Night)"
      required
    ></v-text-field>

    <v-row>
      <v-col cols="6" lg="6">
        <v-menu
          v-model="menu1"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              readonly
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
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
              :rules="[v => !!v || 'Starting Time is required']"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal"
            v-model="start"
            :landscape="$vuetify.breakpoint.mdAndUp"
            full-width
            :min="start"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetStart">Reset</v-btn>
            <v-btn text color="primary" @click="$refs.start.save(start)"
              >OK</v-btn
            >
          </v-time-picker>
        </v-dialog>
      </v-col>
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

    <v-select
      :items="location"
      :rules="[v => !!v || 'Location is required']"
      label="Location"
      required
    ></v-select>

    <v-checkbox v-model="checkbox" label="Are you a vegetarian?"></v-checkbox>

    <v-btn color="success" class="mr-4">Confirm</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
  </v-form>
</template>

<script>
import { service } from "@/plugins/request_service";

export default {
  components: {},
  data: () => ({
    start: null,
    end: null,
    menu1: false,
    modal: false,
    modal2: false,
    date: new Date().toISOString().substr(0, 10),
    name: "",
    nameRules: [
      v => !!v || "Request Name is required",
      v =>
        (v && v.length <= 30) || "Request Name must be less than 30 characters"
    ],
    select: null,
    checkbox: false,
    location: [
      {
        id: "",
        name: ""
      }
    ],
    dateFormatted: null
  }),
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
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
    getData() {
      service.get("/test/knexTest").then(res => {
        console.log(res);
        if (res.data.success) {
          this.location = res.data.data;
        }
      });
    }
  }
};
</script>
