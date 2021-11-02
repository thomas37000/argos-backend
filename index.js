const express = require("express");
const PORT = 8080;
const app = express();

const cors = require("cors");

const equipageRouter = require("./src/controller/equipage.controller");

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});

// middlewares
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/", equipageRouter);


