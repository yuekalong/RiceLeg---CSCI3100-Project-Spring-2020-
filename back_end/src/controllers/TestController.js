const { standardServiceResponse } = require("../utils/ResponseHandler");
const testServices = require("../services/TestServices.js");

module.exports = {
  showHelloWorldControl: function (req, res, next) {
    try {
      console.log("TestController.showHelloWorldControl started!");
      return standardServiceResponse(
        res,
        next,
        testServices.showHelloWorldService()
      );
    } catch (err) {
      console.log(
        "Error: TestController.showHelloWorldControl: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  querySomeData: function (req, res, next) {
    try {
      console.log("TestController.querySomeData started!");
      return standardServiceResponse(res, next, testServices.querySomeData());
    } catch (err) {
      console.log(
        "Error: TestController.querySomeData: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryInsertData: function (req, res, next) {
    try {
      console.log("TestController.queryInsertData started!");
      obj = {
        id: req.body.id,
        name: req.body.name,
      };
      console.log(obj);
      return standardServiceResponse(
        res,
        next,
        testServices.queryInsertData(obj)
      );
    } catch (err) {
      console.log(
        "Error: TestController.queryInsertData: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
};
