const mongoose = require("mongoose");

const url = process.env.MONGOOSE_URL;

const connection = mongoose.connect(url)

module.exports = {connection};