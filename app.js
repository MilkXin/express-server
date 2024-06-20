const express = require("express");
const cors = require("cors");

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

const userRouter = require("./router/user");
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`api server running at http://127.0.0.1:${port}`);
});
