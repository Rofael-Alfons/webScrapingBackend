require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./api/index");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
