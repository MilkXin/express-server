const db = require("../db/index");

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
