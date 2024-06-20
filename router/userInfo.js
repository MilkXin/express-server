const express = require("express");
const expressJoi = require("@escook/express-joi");
const { update_userinfo_schema } = require("../schema/user");
const userInfoHandler = require("../router_handler/userInfo");

const router = express.Router();

router.get("/userInfo", userInfoHandler.getUserInfo);
router.post(
  "/userInfo",
  expressJoi(update_userinfo_schema),
  userInfoHandler.updateUserInfo
);

module.exports = router;
