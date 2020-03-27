const services = require("../Services/Services.js");

const { standardServiceResponse } = require("../../../utils/ResponseHandler");



module.exports = {
  testController: function(req, res, next) {
    try {
      console.log("testController started!");
      return standardServiceResponse(
        res,
        next,
      services.test()
      );
    } catch (err) {
      console.log(
        "Error: testController: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryData: function(req, res, next) {
    try {
      console.log("Controllers.queryData started!");
      return standardServiceResponse(res, next, services.queryData());
    } catch (err) {
      console.log(
        "Error: Controller.queryData: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  updateData: function(req,res,next){
    try {
      req
      console.log("Controllers.updateData started!");
      return standardServiceResponse(res, next, services.updateData());
    } catch (err) {
      console.log(
        "Error: Controller.updateData: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  updateFeedback: function(req,res,next){
    try {
      req
      console.log(req.body);
      console.log(req.body.opinion,req.body.rating,req.body.restaurantName);
      console.log("Controllers.updateFeedback started!");
      
      return standardServiceResponse(res, next, services.updateFeedback(req.body.opinion,req.body.rating,req.body.restaurantName));
    } catch (err) {
      console.log(
        "Error: Controller.updateFeedback: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryFeedback: function(req,res,next){
    try {
      console.log("Controllers.queryData started!");
      return standardServiceResponse(res, next, services.queryFeedback())
    } catch(err){
      console.log(
        "Error: Contoller.queryFeedback:" + 
        JSON.parse(err.message)["message"]
    );
      next(err);
    }
  },
  
};
