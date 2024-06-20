const express = require("express");
const cors = require("cors");

const app = express();
const port = 3007;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./router/user");
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`api server running at http://127.0.0.1:${port}`);
});
