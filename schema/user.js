const joi = require("joi");

const username = joi.string().alphanum().min(1).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// dataUri()指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required();

exports.register_login_schema = {
  body: {
    username,
    password,
  },
};

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
};

// 验证规则对象 - 重置密码
exports.update_password_schema = {
  body: {
    oldPwd: password,
    // 使用password这个规则，验证req.body.newPwd的值
    newPwd: joi.not(joi.ref("oldPwd")).concat(password),
  },
};

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar,
  },
};
