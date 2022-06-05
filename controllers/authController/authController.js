const User = require("../../models/userCreate/user");
const crypto = require("crypto");
const Token = require("../../models/auth/token");
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
  try {
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
    const tokenUser = createTokenUser(user);

    // create refresh token
    let refreshToken = "";
    // check for existing token
    const existingToken = await Token.findOne({ user: user._id });

    if (existingToken) {
      const { isValid } = existingToken;
      if (!isValid) {
        res.status(404).json({ message: "Invalid token" });
      }
      refreshToken = existingToken.refreshToken;
      attachCookiesToResponse({ res, user: tokenUser, refreshToken });
      res.status(200).json({ user: tokenUser });
      return;
    }

    refreshToken = crypto.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };

    await Token.create(userToken);

    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    // OLD CODE
    // const token = user.createJWT();

    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const showCurrentUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  showCurrentUser,
  // logout,
  // forgotPassword,
  // resetPassword,
};
