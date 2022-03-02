const signUpValidation = require("../validations/signup");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbo = require("../db/conn");

const loginHandler = ({ email, createdAt, _id }) => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const token = jwt.sign({ email, createdAt, userId: _id }, "MySuper Secrete", {
    expiresIn: "1d",
  });
  return {
    userId: _id,
    token,
    email,
    displayName,
    createdAt,
    expiresIn: date - new Date().getTime(),
  };
};

router.post("/signup", signUpValidation, (req, res, next) => {
  const { email, password } = req.body;
  dbo
    .collection("admin")
    .findOne({ email })
    .then((doc) => {
      if (doc) {
        const err = new Error("User with this email already exists!");
        err.status = 401;
        throw err;
      }
      return bcrypt.hash(password, 20);
    })
    .then((cPassword) =>
      dbo.collection("admin").insertOne({ email, password: cPassword })
    )
    .then((doc) => loginHandler({ ...doc, createdAt: new Date() }))
    .catch(next);
});

module.exports = router;
