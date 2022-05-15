const express = require("express");
const adminController = require("../../controllers/adminController");
const router = express.Router();

router.get("/", adminController.getAllAdmins);

router.get("/:adminId", adminController.getOneAdmin);

router.post("/", adminController.createNewAdmin);

router.patch("/:adminId", adminController.updateOneAdmin);

router.delete("/:adminId", adminController.deleteOneAdmin);

module.exports = router;
