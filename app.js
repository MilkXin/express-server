const express = require("express");
const cors = require("cors");
const joi = require("joi");
const { expressjwt: jwt } = require("express-jwt");
const config = require("./config");

const app = express();
const port = 3007;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由之前，封装res.cc函数
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 路由之前，解析token, unless放行不需要验证的路由
app.use(
  jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);

const userRouter = require("./router/user");
app.use("/api", userRouter);

const userInfoRouter = require("./router/userInfo");
app.use("/my", userInfoRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// 错误中间件
app.use((err, req, res, next) => {
  // 字段验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);
  //身份认证失败
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败");
  // 其他错误
  res.cc(err);
});

app.listen(port, () => {
  console.log(`api server running at http://127.0.0.1:${port}`);
});
