const adminService = require("../service/adminService");
const User = require("../models/user");

const getAllAdmins = (req, res) => {
  try {
    const allAdmins = adminService.getAllAdmins();
    res.send({ status: "pass", data: allAdmins });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "fail", data: { error: error?.message || error } });
  }
};

const createNewAdmin = async (req, res) => {
  const { firstName, lastName, email, hashrate, amount, createdAt, status } =
    req.body;
  try {
    //create and store the new user
    const result = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      hashrate: hashrate,
      amount: amount,
      createdAt: createdAt,
      status: status,
    });

    console.log(result);

    res.status(201).json({ success: `New user created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOneAdmin = (req, res) => {};
const updateOneAdmin = (req, res) => {};
const deleteOneAdmin = (req, res) => {};

module.exports = {
  getAllAdmins,
  createNewAdmin,
  getOneAdmin,
  updateOneAdmin,
  deleteOneAdmin,
};
