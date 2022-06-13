const express = require("express");
const ProductCloudMiningController = require("../../controllers/ProductCloudMiningController");
const router = express.Router();

router.get("/", ProductCloudMiningController.createNewOrder);

module.exports = router;
