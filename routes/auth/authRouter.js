const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/show", authController.showCurrentUser);

// router.post("/register", register);
// router.post("/login", login);

module.exports = router;
