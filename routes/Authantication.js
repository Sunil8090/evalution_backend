const express = require("express");
const { userInfo } = require("../models/userInfo.modules");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authRoute = express.Router();
authRoute.use(express.json());

authRoute.post("/signup", (req, res) => {
  const { name, email, password, phone_number, department } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    try {
      await userInfo.create({
        name,
        email,
        password: hash,
        phone_number,
        department,
      });
      res.status(200).json({
        status: "sucess",
      });
    } catch (error) {
      console.log(error);
      res.status(404).send("couldn't create a account");
    }
  });
});

authRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userInfo.findOne({ email });
  console.log(user);
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign({ email }, "masai");
        res.status(200).json({
          status: "sucess",
          token: token,
        });
      } else {
        res.send("password is wrong");
      }
    });
  } else {
    res.send("user not found");
  }
});

module.exports = { authRoute };
