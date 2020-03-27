const knex = require('knex')(require('./knexInit.js')['development']);
const tablename = knex.schema.tablename;
console.log(tablename);
/*const updateInfo = [ //should be from http request but now i just test if can access to db properly.
    {restaurantName = 'abc_restaurant'},
    {restaurantDestination = 'link'},
    {DailyOpeningTime = '1000'},
    {DailyClosingTime = '1900'},
    {HolidayOpeningTime = '1200'},
    {HolidayClosingTime = '1600'},
    {Color = True}
]*/
module.exports = {
    queryData: async function(){
        let result = knex.raw(`
            SELECT * FROM ?
        `,[tablename]).then(function(res){
            console.log(res)
        }.catch(function(err){
            console.log(err)
        }))
        console.log(result);
    },
    updateData: async function(){
        try{
            knex(tablename).insert(updateInfo);
            console.log("Update to database success!")
        }
        catch(err){
            console.log("Update to database fail!")
        }
    },
    queryFeedback: async function(){
        let result = knex.raw(`
        SELECT * FROM ?`,[tablename])
        console.log(result);
    },
    updateFeedback: async function(){
        try{
            knex(tablename).insert(updateInfo);
            console.log("Update to database success!");
        }
        catch(err){
            console.log("Update to database fail:") + JSON.parse(err.message);
        }
    }
}