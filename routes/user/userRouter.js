const express = require("express");
const userController = require("../../controllers/userController/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:adminId", userController.getUser);

router.post("/", userController.updateUser);

router.delete("/:adminId", userController.deleteUser);

module.exports = router;
