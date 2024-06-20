const db = require("../db/index");
const bcrypt = require("bcryptjs");

// 注册
// 1. 获取用户提交的数据
// 2. 验证数据的合法性
// 3. 验证用户名是否被占用
// 4. 加密密码
// 5. 向数据库中添加用户数据
// 6. 返回结果

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send({
      status: 1,
      msg: "用户名或密码不能为空",
    });
  }

  db.query(
    "select * from ev_users where username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.send({
          status: 1,
          msg: err.message,
        });
      }
      if (results.length > 0) {
        return res.send({
          status: 1,
          msg: "用户名已被占用",
        });
      }

      // 加密密码
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      db.query(
        "insert into ev_users set ?",
        { username, password: hash },
        (err, results) => {
          if (err) {
            return res.send({ status: 1, msg: err.message });
          }
          if (results.affectedRows === 1) {
            return res.send({ status: 0, msg: "注册成功" });
          }
          res.send({ status: 1, msg: "注册失败" });
        }
      );
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send({
      status: 1,
      msg: "用户名或密码不能为空",
    });
  }

  db.query(
    "select * from ev_users where username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.send({
          status: 1,
          msg: err.message,
        });
      }
      if (results.length === 0) {
        return res.send({
          status: 1,
          msg: "用户名不存在",
        });
      }

      // 验证密码
      if (!bcrypt.compareSync(password, results[0].password)) {
        return res.send({
          status: 1,
          msg: "密码错误",
        });
      }

      // 登录成功
      res.send({
        status: 0,
        msg: "登录成功",
        username,
      });
    }
  );
};