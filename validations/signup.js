const { body, validationResult } = require("express-validator");
const dbo = require("../db/conn");

const signUpValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errors: errors.array(), message: "validation failed" });
  next();
};

module.exports = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  signUpValidation,
];
