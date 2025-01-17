const db = require("../db/index");
const bcrypt = require("bcryptjs");

// 获取用户信息
exports.getUserInfo = (req, res) => {
  const { id } = req.auth;
  const sql = `select id, username, nickname, email, avatar from ev_users where id = ?`;
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 0) return res.cc("用户不存在");
    res.send({
      status: 0,
      msg: "获取用户信息成功",
      data: results[0],
    });
  });
};

// 更新用户信息
exports.updateUserInfo = (req, res) => {
  const { id } = req.auth;
  const { nickname, email, avatar } = req.body;
  const sql = `update ev_users set nickname = ?, email = ?, avatar = ? where id = ?`;
  db.query(sql, [nickname, email, avatar, id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows === 0) return res.cc("更新用户信息失败");
    res.send({
      status: 0,
      msg: "更新用户信息成功",
    });
  });
};

// 更新用户密码
exports.updatePassword = (req, res) => {
  const { id } = req.auth;
  const { oldPwd, newPwd } = req.body;
  const sql = `select * from ev_users where id = ?`;
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 0) return res.cc("用户不存在");
    const user = results[0];
    const isValid = bcrypt.compareSync(oldPwd, user.password);
    if (!isValid) return res.cc("原密码错误");
    const salt = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(newPwd, salt);
    const sql = `update ev_users set password = ? where id = ?`;
    db.query(sql, [pwd, id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows === 0) return res.cc("更新密码失败");
      res.send({
        status: 0,
        msg: "更新密码成功",
      });
    });
  });
};

// 更新用户头像
exports.updateAvatar = (req, res) => {
  const { id } = req.auth;
  const { avatar } = req.body;
  const sql = `update ev_users set avatar = ? where id = ?`;
  db.query(sql, [avatar, id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows === 0) return res.cc("更新头像失败");
    res.send({
      status: 0,
      msg: "更新头像成功",
    });
  });
};
