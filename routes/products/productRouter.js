const express = require("express");
const productStoreController = require("../../controllers/productStoreController");
const router = express.Router();

router.get("/static", productStoreController.getAllProductsStatic);
router.get("/all", productStoreController.getAllProducts);
// router.get("/", adminController.getAllProducts);

module.exports = router;
