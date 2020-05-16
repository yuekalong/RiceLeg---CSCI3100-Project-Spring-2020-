/*
* COMPONENT NAME: REUQEST_ROUTER
* PROGRAMMER: LAM HIU LUI, YUE KA LONG
* VERSION: 1.0 (16 MAY 2020)
*
* PURPOSE: TO CONTROL THE REQUEST SIGNAL AND GIVE THE RESPONSE AFTER
*          CERTAIN ACTION, IT HELPS TO CONVERT THE REQUEST PARAMS OR BODYS TO THE TYPE WE WANT TO SEE
*/
const { standardServiceResponse } = require("../utils/ResponseHandler");
const requestService = require("../services/RequestServices.js");

module.exports = {
  queryLocationList: function (req, res, next) {
    try {
      console.log("RequestController.queryLocationList started!");
      return standardServiceResponse(
        res,
        next,
        requestService.queryLocationList()
      );
    } catch (err) {
      console.log(
        "Error: RequestController.queryLocationList: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryRequest: function (req, res, next) {
    try {
      console.log("RequestController.queryRequestt started!");
      return standardServiceResponse(res, next, requestService.queryRequest());
    } catch (err) {
      console.log(
        "Error: RequestController.queryRequest: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryInvitation: function (req, res, next) {
    try {
      console.log("RequestController.queryInivation started!");
      return standardServiceResponse(
        res,
        next,
        requestService.queryInvitation()
      );
    } catch (err) {
      console.log(
        "Error: RequestController.queryInivation: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryInsertRequestInfo: function (req, res, next) {
    try {
      console.log("RequestController.queryInsertRequestInfo started!");
      obj = {
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        user: req.body.user,
        state: req.body.state,
      };
      console.log(obj);
      return standardServiceResponse(
        res,
        next,
        requestService.queryInsertRequestInfo(obj)
      );
    } catch (err) {
      console.log(
        "Error: RequestController.queryInsertRequestInfo: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  getListOfRequest: function (req, res, next) {
    try {
      console.log("RequestController.getListOfRequest started!");
      return standardServiceResponse(
        res,
        next,
        requestService.getListOfRequest()
      );
    } catch (err) {
      console.log(
        "Error: RequestController.getListOfRequest: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  insertInvitation: function (req, res, next) {
    try {
      console.log("RequestController.insertInvitation started!");
      obj = {
        requestID: req.body.requestID,
        inviteUser: req.body.inviteUser,
      };
      console.log(obj);
      return standardServiceResponse(
        res,
        next,
        requestService.insertInvitation(obj)
      );
    } catch (err) {
      console.log(
        "Error: RequestController.insertInvitation: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  getMyRequest: function (req, res, next) {
    try {
      console.log("RequestController.getMyRequest started!");
      const username = req.params.username;
      return standardServiceResponse(
        res,
        next,
        requestService.getMyRequest(username)
      );
    } catch (err) {
      console.log(
        "Error: RequestController.getMyRequest: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  getInvitation: function (req, res, next) {
    try {
      console.log("RequestController.getInvitation started!");
      const requestID = req.params.requestID;
      return standardServiceResponse(
        res,
        next,
        requestService.getInvitation(requestID)
      );
    } catch (err) {
      console.log(
        "Error: RequestController.getInvitation: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  acceptInvitation: function (req, res, next) {
    try {
      console.log("RequestController.acceptInvitation started!");
      const obj = JSON.parse(req.body.info);
      return standardServiceResponse(
        res,
        next,
        requestService.acceptInvitation(obj)
      );
    } catch (err) {
      console.log(
        "Error: RequestController.acceptInvitation: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
};
