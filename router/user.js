const express = require("express");
const expressJoi = require("@escook/express-joi");
const userHandler = require("../router_handler/user");
const { register_login_schema } = require("../schema/user");

const router = express.Router();

router.post(
  "/register",
  expressJoi(register_login_schema),
  userHandler.register
);

router.post("/login", expressJoi(register_login_schema), userHandler.login);

module.exports = router;
