const services = require("./Services.js");

const { standardServiceResponse } = require("../../utils/ResponseHandler");

module.exports = {
  testController: function(req, res, next) {
    try {
      console.log("testController started!");
      return standardServiceResponse(
        res,
        next,
        "controller is working properly!"
      );
    } catch (err) {
      console.log(
        "Error: testController: " + JSON.parse(err.message)["message"]
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
        "Error: Controller.queryData: " + JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryFeedback: function(req, res, next) {
    try {
      console.log("Controllers.queryData started!");
      return standardServiceResponse(res, next, services.queryFeedback());
    } catch (err) {
      console.log(
        "Error: Contoller.queryFeedback:" + JSON.parse(err.message)["message"]
      );
      next(err);
    }
  }
};
