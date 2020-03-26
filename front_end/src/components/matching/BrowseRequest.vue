<template>
  <v-row no-gutters>
    <v-col
      v-for='n in 5'
      :key='n'
      cols='12'
      sm='4'
      
    >
      <v-card
        class="ma-3"
        centered
      >
      
        <v-img
          class="white--text align-end dark"
          height="200px"
          src="@/assets/matching_photo/meat_meal.jpg"
          gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4)"
        >
          <v-card-title >Request name :)</v-card-title>
          
        </v-img>

        <v-card-text class="black--text subtitle-1 py-0 pt-3">Med Can - 13:00 - 04/04/2020</v-card-text>

        <v-card-text class="text--primary ">
          <div>Hi. I like coding and making friends. Let's eat and get to know each other :)</div>
    
        </v-card-text>

        <v-card-actions>
          <v-dialog v-model="explore" persistent max-width="500">
            <template v-slot:activator="{ on }">
              <v-btn
                color="orange"
                text
                v-on="on"
              >
                Explore
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Request name :)</v-card-title>
              <v-card-text class = "subtitle-1 py-0">Location: Med Can</v-card-text>
              <v-card-text class = "subtitle-1 py-0">Date: 01/04/2020</v-card-text>
              <v-card-text class = "subtitle-1 py-0">Time: 13:00</v-card-text>
              <v-card-text class = "subtitle-1 py-0">Major: Computer Science</v-card-text>
              <v-card-text class = "subtitle-1 py-0">Year: 3</v-card-text>
              <v-card-text class = "subtitle-1 py-0">Self introduction:</v-card-text>
              <v-card-text class = "subtitle-1 py-0">Hi. I like coding and making friends. Let's eat and get to know each other :)</v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="explore = false">Go Back</v-btn>
                <v-dialog v-model="send" persistent max-width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn 
                      color="green darken-1" 
                      text 
                      v-on="on"
                    >
                      Send Invitation
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Send Invitation</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal first name*" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Legal last name*"
                              hint="example of persistent helper text"
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field label="Email*" required></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field label="Password*" type="password" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="['0-17', '18-29', '30-54', '54+']"
                              label="Age*"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-autocomplete
                              :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                              label="Interests"
                              multiple
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="send = false">Go Back</v-btn>
                      <v-btn color="blue darken-1" text @click="send = false">Send</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-card-actions>
      
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
export default {
  data: () => ({
    explore: false,
    send: false,

  }),
  mounted() {

  },
  methods: {
    getData() {
      service.get("/test/knexTest").then(res => {
        console.log(res);
        if (res.data.success) {
          this.data = res.data.data;
        }
      });
    },
  }
}
</script>
  
