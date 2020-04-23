const express = require("express");
const router = express.Router();
const authContoller = require("../controllers/AuthController.js");

router.post("/signUp", authContoller.signUp);
router.post("/login", authContoller.login);
router.get("/checkLogged", authContoller.checkLogged);
router.get("/logout", authContoller.logout);
router.put("/updateProfile", authContoller.updateProfile);

router.get("/queryAccountInform/:username", authContoller.queryAccountInform);
module.exports = router;
