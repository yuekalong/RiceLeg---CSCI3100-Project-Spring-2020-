const { standardServiceResponse } = require("../utils/ResponseHandler");
const testServices = require("../services/SignUpServices.js");

module.exports = {
  queryLocationList: function(req, res, next) {
    try {
      console.log("SignUpController.queryLocationList started!");
      return standardServiceResponse(res, next, testServices.queryLocationList());
    } catch (err) {
      console.log(
        "Error: SignUpController.queryLocationList: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryInsertUserInfo: function(req, res, next) {
    try {
      console.log("SignUpController.queryInsertUserInfo started!");
      obj = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        major: req.body.major,
        year: req.body.year,
        college:req.body.college
      };
      console.log(obj);
      return standardServiceResponse(
        res,
        next,
        testServices.queryInsertUserInfo(obj)
      );
    } catch (err) {
      console.log(
        "Error: SignUpController.queryInsertUserInfo: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  }
};
