const User = require("../../models/userCreate/user");
const crypto = require("crypto");
const {
  attachCookiesToResponse,
  createTokenUser,
  // sendVerificationEmail,
  // sendResetPasswordEmail,
  // createHash,
} = require("../../utils");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(201).json({ user: user, token });
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({ message: "No Credentials passed" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Invalid username email Credentials" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(404).json({ message: "Invalid Credentials password" });
  }
  // compare password
  const token = user.createJWT();
  res.status(200).json({ user: { name: user.name }, token });
};
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       res.status(401).json({ message: "Invalid Credentials" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(401).json({ message: "Invalid Credentials" });
//     }
//     const isPasswordCorrect = await user.comparePassword(password);
//     if (!isPasswordCorrect) {
//       res.status(401).json({ message: "Invalid Credentials" });
//     }
//     // compare password
//     const tokenUser = createTokenUser(user);

//     let refreshToken = "";
//     const existingToken = await Token.findOne({ user: user._id });
//     if (existingToken) {
//       const { isValid } = existingToken;
//       if (!isValid) {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//       refreshToken = existingToken.refreshToken;
//       attachCookiesToResponse({ res, user: tokenUser, refreshToken });
//       res.status(200).json({ user: tokenUser });
//       return;
//     }

//     refreshToken = crypto.randomBytes(40).toString("hex");
//     const userAgent = req.headers["user-agent"];
//     const ip = req.ip;
//     const userToken = { refreshToken, ip, userAgent, user: user._id };

//     await Token.create(userToken);

//     attachCookiesToResponse({ res, user: tokenUser, refreshToken });

//     res.status(200).json({ user: { name: user.name }, token });
//     console.log("successful login for " + user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const logout = async (req, res) => {
//   await Token.findOneAndDelete({ user: req.user.userId });

//   res.cookie("accessToken", "logout", {
//     httpOnly: true,
//     expires: new Date(Date.now()),
//   });
//   res.cookie("refreshToken", "logout", {
//     httpOnly: true,
//     expires: new Date(Date.now()),
//   });
//   res.status(StatusCodes.OK).json({ msg: "user logged out!" });
// };

// const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     throw new CustomError.BadRequestError("Please provide valid email");
//   }

//   const user = await User.findOne({ email });

//   if (user) {
//     const passwordToken = crypto.randomBytes(70).toString("hex");
//     // send email
//     const origin = "http://localhost:8000";
//     await sendResetPasswordEmail({
//       name: user.name,
//       email: user.email,
//       token: passwordToken,
//       origin,
//     });

//     const tenMinutes = 1000 * 60 * 10;
//     const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

//     user.passwordToken = createHash(passwordToken);
//     user.passwordTokenExpirationDate = passwordTokenExpirationDate;
//     await user.save();
//   }

//   res
//     .status(StatusCodes.OK)
//     .json({ msg: "Please check your email for reset password link" });
// };

// const resetPassword = async (req, res) => {
//   const { token, email, password } = req.body;
//   if (!token || !email || !password) {
//     throw new CustomError.BadRequestError("Please provide all values");
//   }
//   const user = await User.findOne({ email });

//   if (user) {
//     const currentDate = new Date();

//     if (
//       user.passwordToken === createHash(token) &&
//       user.passwordTokenExpirationDate > currentDate
//     ) {
//       user.password = password;
//       user.passwordToken = null;
//       user.passwordTokenExpirationDate = null;
//       await user.save();
//     }
//   }

//   res.send("reset password");
// };

module.exports = {
  register,
  login,
  // logout,
  // forgotPassword,
  // resetPassword,
};
