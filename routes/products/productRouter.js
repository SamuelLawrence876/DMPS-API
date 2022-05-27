const express = require("express");
const productStoreController = require("../../controllers/productController/productStoreController");
const router = express.Router();

router.get("/static", productStoreController.getAllProductsStatic);
router.get("/all", productStoreController.getAllProducts);

module.exports = router;
