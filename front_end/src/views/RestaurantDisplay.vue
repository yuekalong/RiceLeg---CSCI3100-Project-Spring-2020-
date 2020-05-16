/*
 * MODULE NAME: RESTAURANTDISPLAY
 * PROGRAMMER: YUE KA LONG, LAU PING TUNG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE RESTAURANT DISPLAY PAGE WHICH HANDLE THE LOGIN
 *
 */
<template>
  <!-- id belongs to restaurant display-->
  <div id="RestaurantDisplay">
    <v-container grid-list-xl>
      <!-- use this vue function to show the restuarant in display one by one -->
      <v-data-iterator
        :items="restaurant"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="primary darken-1" class="mb-1">
            <!-- this is reponsibe for the pink bar of thee searching function -->
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
          </v-toolbar>
        </template>
        <!--Here is he main body of the data iterator will shown all the desirable result with repect to the search bar-->
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.name" cols="12" sm="12" md="6" lg="6">
              <!--type v-card will be the main body of the iterator and contain different information of the restaurant-->
              <v-card>
                <div>
                  <v-img
                    class="white--text align-end dark"
                    height="200px"
                    src="@/assets/matching_photo/meal_7.jpg"
                    gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4)"
                  >
                    <v-card-title class="display-1">
                      {{
                      item.restaurantName
                      }}
                    </v-card-title>
                  </v-img>
                </div>
                <!--  Here will show the restaurant destination, and opening time-->
                <v-card-text>
                  <div class="headline py-0">{{ item.restaurantDestination }}</div>
                  <div class="subtitle-1 py-0">
                    Daily: {{ item.dailyOpeningTime }} -
                    {{ item.dailyClosingTime }}
                  </div>
                  <div class="subtitle-1 py-0">
                    Holiday: {{ item.holidayOpeningTime }} -
                    {{ item.holidayClosingTime }}
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <!--  here we will call the child component of the vue call comment-->
                  <Comment :restaurantName="item.restaurantName" />
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <!-- the footer of the v data iterator is for selecting how many items in a page-->
        <template v-slot:footer>
          <v-row class="mt-2 mx-5" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark text color="primary" class="ml-2" v-on="on">
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <!--Here is the total number of page of the result-->
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <!-- we can press kclick to control which number of the page-->
            <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
            <v-btn fab dark color="secondary darken-3" class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab dark color="secondary darken-3" class="ml-1" @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>
<script>
import { service } from "@/plugins/request_service";
import Comment from "@/components/restaurant/Comment";
// import the child component and the the plugins from external file or library

export default {
  components: {
    Comment // all child component will be listed here
  },
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: "restaurantName", // it is the default sorting keyword and we not yet type the code and test for other keywords

    // it is use to test if the cardbox are shown correctly, u will see it when local database is not linked or exist.
    restaurant: [
      {
        restaurantName: "aaaa",
        restaurantDestination: "aaaa",
        dailyOpeningTime: "aaaaa",
        dailyClosingTime: "aaaa",
        holidayOpeningTime: "aaaa",
        holidayClosingTime: "aaaaa"
      }
    ]
  }),
  computed: {
    // to get the latest page number to update the window
    numberOfPages() {
      return Math.ceil(this.restaurant.length / this.itemsPerPage);
    },
    // to update the page via the search keyword
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    }
  },
  mounted() {
    this.fetchData(); //get the unsorted data from database at mounted stage after the template iss being created
  },
  methods: {
    //next page button
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },

    //previous page button
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },

    //call when different number of item requires is changed
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

    fetchData() {
      service.get(`/restaurant/getAllRestaurant/`).then(res => {
        if (res.data.success) {
          this.restaurant = res.data.data;
        }
      });
    }
  }
};
</script>
