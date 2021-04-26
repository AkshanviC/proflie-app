const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.POST || 5000;
const dataRoute = require("./routes/data");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
mongoose
  .connect(
    `mongodb+srv://brintha:stella56$@cluster0.ruicr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
app.use("/profile", dataRoute);
app.use("/", (req, res) => res.send("we are on home"));
app.listen(5000, console.log(`server running on port ${port}`));
