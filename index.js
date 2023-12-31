require("dotenv").config();
const express = require("express");
const { authRoute } = require("./routes/Authantication");
const cors = require("cors");
const { connection } = require("./config/db");
const { userNotices } = require("./models/notices.modules");
const {noticesRoute} = require("./routes/notices")

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRoute);
app.use("/notice",noticesRoute)

app.get("/", async (req, res) => {
  let data = await userNotices.find({}).limit(10);
  res.status(200).json({
    status: "sucess",
    data: data,
  });
});

const PORT = 8000;
app.listen(PORT, async () => {
  await connection;
  console.log("listining...");
});

//MONGOOSE_URL
