const express = require("express");
const expressJoi = require("@escook/express-joi");
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
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

// 更新用户头像的路由
router.post(
  "/update/avatar",
  expressJoi(update_avatar_schema),
  userInfoHandler.updateAvatar
);

module.exports = router;
