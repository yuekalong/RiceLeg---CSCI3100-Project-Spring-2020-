<template>
  <div id="RestaurantDisplay">
    <v-container grid-list-xl>
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
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.name" cols="12" sm="12" md="6" lg="6">
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
                  <Comment :restaurantName="item.restaurantName" />
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>
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
export default {
  components: {
    Comment
  },
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: "restaurantName",
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
    numberOfPages() {
      return Math.ceil(this.restaurant.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
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
