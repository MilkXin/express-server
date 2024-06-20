const express = require("express");
const expressJoi = require("@escook/express-joi");
const {
  update_userinfo_schema,
  update_password_schema,
} = require("../schema/user");
const userInfoHandler = require("../router_handler/userInfo");

const router = express.Router();

router.get("/userInfo", userInfoHandler.getUserInfo);

router.post(
  "/userInfo",
  expressJoi(update_userinfo_schema),
  userInfoHandler.updateUserInfo
);

// 更新密码的路由
router.post(
  "/updatePassword",
  expressJoi(update_password_schema),
  userInfoHandler.updatePassword
);

module.exports = router;
