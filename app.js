require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./api/index");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

const logEveryTenMinutes = () => {
  console.log("Wake up");
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Initial call to log immediately on startup
  logEveryTenMinutes();

  // Start the interval to log every 10 minutes (600000 milliseconds)
  setInterval(logEveryTenMinutes, 10 * 60 * 1000);
});
