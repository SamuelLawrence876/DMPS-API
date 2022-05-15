const express = require("express");
const adminController = require("../../controllers/adminController");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const { auth } = require("express-oauth2-jwt-bearer");
const router = express.Router();
const checkScopes = requiredScopes("read:admin");

/* Checking the JWT token to see if it is valid. */
const checkJwt = auth({
  audience: "dmpsuser",
  issuerBaseURL: `https://dev-ouzw7myp.us.auth0.com/`,
});

router.get("/", checkJwt, checkScopes, adminController.getAllAdmins);

router.get("/:adminId", checkJwt, checkScopes, adminController.getOneAdmin);

router.post("/", adminController.createNewAdmin);

router.patch(
  "/:adminId",
  checkJwt,
  checkScopes,
  adminController.updateOneAdmin
);

router.delete(
  "/:adminId",
  checkJwt,
  checkScopes,
  adminController.deleteOneAdmin
);

module.exports = router;
