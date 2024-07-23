const express = require("express");
const router = express.Router();
const scrapeRoutes = require("./routes/scrape");

router.use("/scrape", scrapeRoutes);

module.exports = router;
