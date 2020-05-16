/*
 * COMPONENT NAME: AUTHCONTROLLER
 * PROGRAMMER: YUE KA LONG, TU CHEN HSIEN
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE AUTHENICATATION CONTROLLER OF THE EXPRESS.JS.
 *          CONTROLLER IS USED TO CONTROL THE REQUEST SIGNAL AND GIVE THE RESPONSE AFTER
 *          CERTAIN ACTION, IT HELPS TO CONVERT THE REQUEST PARAMS OR BODYS TO THE TYPE WE WANT TO SEE
 *
 *
 */

// import the module for handling the request in a certain format
const { standardServiceResponse } = require("../utils/ResponseHandler");

// import the service, where to do the query or editing to the database
const authServices = require("../services/AuthServices.js");

// import a node module for handling the login request
const passport = require("passport");

// as we use jwt token for our login, we import jwt module
const jwt = require("jsonwebtoken");
const secret_key = "secret";

// this controller is used to control the request signal and give the response after certain action
// it helps to convert the request params or bodys to the type we want to use

module.exports = {
  //  this is for sign up request
  signUp: function (req, res, next) {
    try {
      console.log("AuthController.signUp started!");
      const newUser = req.body;
      return standardServiceResponse(res, next, authServices.signUp(newUser));
    } catch (err) {
      console.log(
        "Error: AuthController.signUp: " + JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },

  //  this is for log in request
  login: async function (req, res, next) {
    try {
      console.log("AuthController.login started!");
      // we use passport for our authentication
      return passport.authenticate(
        "local",
        { session: false },
        (err, user, info) => {
          // if there have error occur we immediately send log out signal to our request
          if (err) {
            req.logOut();
            return next(err);
          }

          // if the user is null we immediately send log out signal to our request
          if (!user) {
            req.logOut();
            return next(info);
          }

          // send the login signal to our request
          req.login(user, { session: false }, async (err) => {
            // if error occur assign error to next function
            if (err) {
              return next(err);
            }

            // if no error occur
            try {
              // assign the jwt token
              const token = jwt.sign(
                {
                  sub: user,
                  exp: Math.floor(Date.now() / 1000) + 60 * 360,
                },
                secret_key
              );

              // return the response
              return res.json({
                success: true,
                data: {
                  userInfo: user,
                  token: token,
                },
              });
            } catch (e) {
              // if error occur assign error to next function
              return next(e);
            }
          });
        }
      )(req, res, next);
    } catch (err) {
      // if error occur console.log the error
      console.log(
        "Error: AuthController.login: " + JSON.parse(err.message)["message"]
      );

      // assign error to next function
      next(err);
    }
  },

  //  this is for check logged in or not request
  checkLogged: function (req, res, next) {
    try {
      console.log("AuthController.checkLogged started!");

      // check the request header have jwt token or not
      if (req.headers.hasOwnProperty("authorization")) {
        // if have token, verify the jwt token
        let user = {
          userInfo: jwt.verify(
            req.headers.authorization.split(" ")[1],
            secret_key
          )["sub"],
          token: req.headers.authorization.split(" ")[1],
        };
        return res.json({
          statusCode: 200,
          data: user,
          success: true,
        });
      } else {
        // if no token, return Unauthorized action
        return res.json({
          error: "Unauthorized action",
          statusCode: 403,
          success: false,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  //  this is for log out request
  logout: function (req, res, next) {
    try {
      console.log("AuthController.logout started!");

      // send request log out signal
      req.logOut();

      // return a success signal to let front end know logout successfully
      return res.json({ data: { success: true, user: req.user } });
    } catch (err) {
      // if error occur console.log the error
      console.log(
        "Error: AuthController.logout: " + JSON.parse(err.message)["message"]
      );

      // assign error to next function
      next(err);
    }
  },

  // this is for query the account information request
  queryAccountInform: function (req, res, next) {
    try {
      console.log("AuthController.queryAccountInform started!");
      const username = req.params.username;
      //fetch data from account database using username as key
      return standardServiceResponse(
        res,
        next,
        authServices.queryAccountInform(username)
      );
    } catch (err) {
      //if error occur console.log the error
      console.log(
        "Error: AuthController.queryAccountInform: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  updateProfile: function (req, res, next) {
    // defining the object that will be passed to authServices.updateProfile()
    try {
      console.log("AuthController.updateProfile started!");

      //objects needed to be fetched from datavase
      obj = {
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        email: req.body.email,
        year: req.body.year,
        major: req.body.major,
        email: req.body.email,
        college: req.body.college,
        selfIntro: req.body.selfIntro,
        oldpw: req.body.oldpw,
      };
      //fetch data from database
      return standardServiceResponse(
        res,
        next,
        authServices.updateProfile(obj)
      );
    } catch (err) {
      //if error occur console.log the error
      console.log(
        "Error: AuthController.updateProfile: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
};
