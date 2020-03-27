const knex = require('knex')(require('../knexInit.js')['development']);
const detailTable = 'restaurant_info.restaurant_details';
const feedbackTable = 'restaurant_info.feedback';
const dbname = 'restaurant_info';


const updateInfo = {     //should be from http request but now i just test if can access to db properly.
    columnName : [
        'restaurantName',
        'restaurantDestination',
        'DailyOpeningTime',
        'DailyClosingTime',
        'HolidayOpeningTime',
        'HolidayClosingTime',
        'Color'],
    values : ['abc_restaurant','link','10:00','19:00','12:00','16:00','1'] // value from updaterequest
};

const updateFeedbackInfo = {
    columnName : [
        'opinion',
        'rating',
        'restaurantName'
    ],
    values : [1,2,3]
}
module.exports = {
    test: async function(){
        return "testvalue";
    },
    queryData: async function(){
        //console.log(knex.schema.withSchema('information_schema').raw(`SELECT * FROM information_schema.tables;`));
        //console.log((knex.schema['information_schema'].raw(`SELECT * FROM information_schema.tables;`)));
    
        //console.log(Object.values(knex.raw(`SELECT table_name FROM information_schema.tables WHERE table_schema ='?';`,[dbname])));
        let result = knex.raw('SELECT * FROM ??', [detailTable])
        
        return result;
    },
    updateData: async function(){
        try{
            knex(detailTable).insert(updateInfo);
            let result = knex.schema.raw('INSERT INTO ?? (??) VALUES (?)' ,[detailTable,updateInfo.columnName,updateInfo.values]);
            console.log("Update to database success!");
            return result;
        }
        catch(err){
            console.log("Update to database fail!");
        }
    },
    queryFeedback: async function(){
        let result = knex.raw('SELECT * FROM ?'
        ,['restaurant_details'])
        console.log(result);
    },
    updateFeedback: async function(opinion,rating,name){
        const updateFeedbackInfo = {
            columnName : [
                'opinion',
                'rating',
                'restaurantName'
            ],
            values : [opinion,rating,name]
        }
        try{
            knex(detailTable).insert(updateInfo);
            let result = knex.schema.raw('INSERT INTO ?? (??) VALUES (?)' ,[feedbackTable,updateFeedbackInfo.columnName,updateFeedbackInfo.values]);
            console.log("Update to database success!");
            return result;
        }
        catch(err){
            console.log("Update to database fail!");
        }
    }
}