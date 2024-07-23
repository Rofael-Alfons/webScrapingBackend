const express = require("express");
const { postScrape } = require("../controller/scrape");
const router = express.Router();

router.post("/", postScrape);
module.exports = router;
