<template>
  <div id="restaurant_display">
    <p> "Restaurant" </p>
    {{data}}
    <div class="col-sm-2 sidenav"> 
                <label for="cars">Sorted by:</label>
                <select v-model="selected">
                  <option v-for="item in vals" :value="item.value" :key="item.value">{{item.value}}></option>
                </select>
                <hr>
                <span>Selected: {{ selected }}</span>
              </div>
      <ul>
        <li v-for="index,item in data">
          
          <div class="container-fluid text-center">    
            <div class="row content">
              
            <div class="col-sm-8 text-left"> 
              <h1>{{data[0][item].restaurantName}}</h1>
              <h2> 10 students have been here </h2>
              <h5> <span class="fa fa-user"></span></span> OpeningHour:{{data[0][item].dailyOpeningTime}}-{{data[0][item].dailyClosingTime}}</h5> <!-- details-->
              <h5> Venue: {{data[0][item].restaurantDestination}}</h5>
              <hr>
              <h3>Any Comment?</h3>
              <v-text-field v-model = "opinion"></v-text-field>
              <div id='example-3'>
                <input type="radio" id="1" value="1" v-model="checkedNum">
                <label for="one">One</label>
                <input type="radio" id="2" value="2" v-model="checkedNum">
                <label for="two">Two</label>
                <input type="radio" id="3" value="3" v-model="checkedNum">
                <label for="three">Three</label>
                <input type="radio" id="4" value="4" v-model="checkedNum">
                <label for="four">Four</label>
                <input type="radio" id="5" value="5" v-model="checkedNum">
                <label for="five">Five</label>
                <br>
                <span>Checked num: {{ checkedNum }} </span>
              </div>
              <p>{{getName(data[0][item].restaurantName)}}</p>
              <v-btn @click="updateData">insert!</v-btn>
            </div>
            <div class="col-sm-2 sidenav">
              <div class="well">
                <p>{picturelink}</p>
              </div>
              <div class="well">
                <p>{picturelink}}</p>
              </div>
            </div>
          </div>
        </div>
        </li>
      </ul>
  </div>
  
</template>

<script>
import { service } from "@/plugins/request_service";

export default {
  name: "restaurant_display",
  components: {},
  data: () => ({
    data: "",
    restaurantName : "",
    checkedNum: [],
    opinion: "",
    selected: 'None',
    vals: [{
                value: 'Name',
                tags: ['hello', 'test']
            },
            {
                value: 'OpeningTime',
                tags: ['hello']
            },
            {
                value: 'ClosingTime',
                tags: ['hello', 'test']
            },
            {
                value: 'Rating',
                tags: ['rating']
            }
        ]
  }),
  mounted() {
    this.getData();
    //getName(res_name);
  },
  methods: {
    getName(res_name){
      
      this.restaurantName = res_name;
    },
    XD() {
      console.log("yeah!!!");
    },
    getData() {
      service.get("/restaurant/query").then(res => {
        console.log(res);
        if (res.data.success) {
          this.data = res.data.data;
        }
      });
    },
    updateData() {
      console.log("XD");
      //this.restaurantName = data[0][item].restaurantName;
      service.post("/restaurant/update",{
         opinion: this.opinion,
         
         rating: this.checkedNum,
         restaurantName: this.restaurantName
      })
      .then(res => {
        if (res.data.success)
          console.log("success!");
        else
          console.log("fail!");
        
      });
    },
    insertData() {
      service
        .post("/restaurant/update", {
          id: this.id,
          name: this.name
        })
        .then(res => {
          if (res.data.success) {
            console.log("success!");
          }
        });
    }
  
  }
}
</script>

<style scoped lang="css">
$padding-size: 10px;
.box{
  background-color: lightgrey;
  width: 300px;
  border: 15px solid green;
  padding: 50px;
  margin: 20px;
}

</style>
