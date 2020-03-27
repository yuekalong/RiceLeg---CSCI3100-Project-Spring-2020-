const express = require('express');
const app = express();

app.get('/hi',function(req,res,data){
    res.end("hi there");
});

app.listen(3100,function(){
    console.log("I am listeing on port 3100");
});