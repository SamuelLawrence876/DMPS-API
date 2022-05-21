const adminService = require("../service/adminService");
const User = require("../models/user");

const getAllAdmins = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
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

const getOneAdmin = async (req, res) => {
  try {
    const { adminId: _id } = req.params;
    console.log({ _id });
    const user = await User.findById(_id);
    console.log("user found");
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ user });
    console.log({ user });
  } catch (error) {
    res.status(500);
    res.send({ status: "fail", data: { error: error?.message || error } });
  }
};
const updateOneAdmin = async (req, res) => {
  const { adminId: _id } = req.params;
  const { firstName, lastName, email, hashrate, amount, createdAt, status } =
    req.body;
  try {
    const data = await User.findByIdAndUpdate(
      { _id },
      {
        $set: {
          firstName,
          lastName,
          email,
          hashrate,
          amount,
          createdAt,
          status,
        },
      }
    );
    console.log({ data });
    if (data) res.status(200).json({ data });
  } catch (error) {
    res.send({ status: "fail", data: { error: error?.message || error } });
  }
};

const deleteOneAdmin = async (req, res) => {
  try {
    const { adminId: _id } = req.params;
    const user = await User.findByIdAndDelete({ _id });
    console.log("user deleted");
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ task: user });
  } catch (error) {
    res.status(500);
    res.send({ status: 500, data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllAdmins,
  createNewAdmin,
  getOneAdmin,
  updateOneAdmin,
  deleteOneAdmin,
};
