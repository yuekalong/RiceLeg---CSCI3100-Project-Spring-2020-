const { standardServiceResponse } = require("../utils/ResponseHandler");
const authServices = require("../services/AuthServices.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secret_key = "secret";

module.exports = {
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
  login: async function (req, res, next) {
    try {
      console.log("AuthController.login started!");
      return passport.authenticate(
        "local",
        { session: false },
        (err, user, info) => {
          if (err) {
            req.logOut();
            return next(err);
          }

          if (!user) {
            req.logOut();
            return next(info);
          }

          req.login(user, { session: false }, async (err) => {
            if (err) {
              return next(err);
            }
            try {
              const token = jwt.sign(
                {
                  sub: user,
                  exp: Math.floor(Date.now() / 1000) + 60 * 360,
                },
                secret_key
              );
              return res.json({
                success: true,
                data: {
                  userInfo: user,
                  token: token,
                },
              });
            } catch (e) {
              return next(e);
            }
          });
        }
      )(req, res, next);
    } catch (err) {
      console.log(
        "Error: AuthController.login: " + JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  checkLogged: function (req, res, next) {
    try {
      console.log("AuthController.checkLogged started!");
      if (req.headers.hasOwnProperty("authorization")) {
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
  logout: function (req, res, next) {
    try {
      console.log("AuthController.logout started!");
      req.logOut();
      return res.json({ data: { success: true, user: req.user } });
    } catch (err) {
      console.log(
        "Error: AuthController.logout: " + JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  queryAccountInform: function (req, res, next) {
    try {
      console.log("AuthController.queryAccountInform started!");
      const username = req.params.username;
      return standardServiceResponse(
        res,
        next,
        authServices.queryAccountInform(username)
      );
    } catch (err) {
      console.log(
        "Error: AuthController.queryAccountInform: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  updateProfile: function (req, res, next) {
    try {
      console.log("AuthController.updateProfile started!");
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
      return standardServiceResponse(
        res,
        next,
        authServices.updateProfile(obj)
      );
    } catch (err) {
      console.log(
        "Error: AuthController.updateProfile: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
};
