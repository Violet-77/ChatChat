const express = require("express");
const router = express.Router(); // 创建路由实例

router.get("/", (req, res) => {
  res.send({ response: "Server is running" }).status(200);
  console.log("Router Get!!!");
});

module.exports = router;