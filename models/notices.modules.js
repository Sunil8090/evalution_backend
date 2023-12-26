const mongoose = require("mongoose");

const userSchmea = mongoose.Schema({
  title: String,
  body: String,
  category: { type: String, enum: ["parking", "covid", "maintenance"] },
  date: String,
  email: String,
});

const userNotices = mongoose.model("userNotice", userSchmea);

module.exports = { userNotices };
