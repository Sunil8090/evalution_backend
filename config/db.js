const mongoose = require("mongoose");

const url =
  "mongodb+srv://sunil8090:sunilmongodb8090@cluster0.09zm59o.mongodb.net/evaluation";

const connection = mongoose.connect(url);

module.exports = { connection };
