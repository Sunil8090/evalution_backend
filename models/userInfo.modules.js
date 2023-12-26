const mongoose = require("mongoose");

const userSchmea = mongoose.Schema({
  name : String,
  email : String,
  password : String,
  phone_number : String,
  department :String,
});

const userInfo = mongoose.model("userData",userSchmea)

module.exports = {userInfo};
