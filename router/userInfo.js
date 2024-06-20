const express = require("express");
const userInfoHandler = require("../router_handler/userInfo");

const router = express.Router();

router.get("/userInfo", userInfoHandler.getUserInfo);

module.exports = router;
