const express = require("express");
const userController = require("../../controllers/userController/userController");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../../middleware/authentication");
// change to get user profile
router.get("/", authenticateUser, userController.getAllUsers);
router.get("/showUser", authenticateUser, userController.showCurrentUser);

router.get("/:adminId", userController.getUser);

router.post("/", userController.updateUser);

router.delete("/:adminId", userController.deleteUser);

module.exports = router;
