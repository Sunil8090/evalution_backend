const express = require("express");
const { userNotices } = require("../models/notices.modules");
var jwt = require("jsonwebtoken");

const noticesRoute = express.Router();
noticesRoute.use(express.json());

const check_the_user = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, "masai", function (err, decoded) {
      if (decoded) {
        req.userEmail = decoded.email;
        next();
        return;
      } else {
        return res.send(err);
      }
    });
  } else {
    return res.send("Not authorized");
  }
};

noticesRoute.post("/create", check_the_user, async (req, res) => {
  let { userEmail } = req;
  await userNotices.create({ ...req.body, email: userEmail });
  res.send("created...");
});

noticesRoute.patch("/edit", check_the_user, async (req, res) => {
  let { userEmail } = req;
  let {notice_id} = req.headers;

  let notice = await userNotices.findOne({_id:notice_id})

  if(notice.email === userEmail){
    await userNotices.findOneAndUpdate(req.body)
    res.send("updated sucessfully")
  }else{
    res.send("Not authorized...");
  }
});

noticesRoute.delete("/delete", check_the_user, async (req, res) => {
  let { userEmail } = req;
  let {notice_id} = req.headers;

  let notice = await userNotices.findOne({_id:notice_id})

  if(notice.email === userEmail){
    await userNotices.findOneAndDelete({_id:notice_id})
    res.send("deleted sucessfully")
  }else{
    res.send("Not authorized...");
  }
});

noticesRoute.post("/read", check_the_user, async (req, res) => {
  let { userEmail } = req;
  let data =  await userNotices.find({ email: userEmail });
  res.status(200).json(data);
});


module.exports = { noticesRoute };
