const express = require("express");
const connection = require("./config/db");
const familyRouter = require("./routes/family.routes");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/family", familyRouter);

app.get("/", (req, res) => {
  res.send("hey");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("server has been started");
  } catch (e) {
    console.log(e);
  }
});
