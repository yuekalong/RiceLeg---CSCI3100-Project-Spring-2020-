const { standardServiceResponse } = require("../utils/ResponseHandler");
const testServices = require("../services/SendRequestServices.js");

module.exports = {
  queryLocationList: function(req, res, next) {
    try {
      console.log("SendRequestController.queryLocationList started!");
      return standardServiceResponse(res, next, testServices.queryLocationList());
    } catch (err) {
      console.log(
        "Error: SendRequestController.queryLocationList: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryRequest: function(req, res, next) {
    try {
      console.log("SendRequestController.queryRequestt started!");
      return standardServiceResponse(res, next, testServices.queryRequest());
    } catch (err) {
      console.log(
        "Error: SendRequestController.queryRequest: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryInvitation: function(req, res, next) {
    try {
      console.log("SendRequestController.queryInivation started!");
      return standardServiceResponse(res, next, testServices.queryInvitation());
    } catch (err) {
      console.log(
        "Error: SendRequestController.queryInivation: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryInsertRequestInfo: function(req, res, next) {
    try {
      console.log("SendRequestController.queryInsertRequestInfo started!");
      obj = {
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        user:req.body.user,
        state: req.body.state
      };
      console.log(obj);
      return standardServiceResponse(
        res,
        next,
        testServices.queryInsertRequestInfo(obj)
      );
    } catch (err) {
      console.log(
        "Error: SendRequestController.queryInsertRequestInfo: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  }
};
