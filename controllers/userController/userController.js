const User = require("../../models/userCreate/user");

//! this one
const getAllUsers = async (req, res) => {
  console.log(req.user);
  try {
    const admin = await User.find({ _id: req.user.userId });
    console.log(admin);
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  console.log("hi");
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.findOne({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      res.status(404).json({ message: error.message });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req;

    if (company === "" || position === "") {
      res.status(500).json({ message: error.message });
    }
    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      res.status(404).json({ message: error.message });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.findByIdAndRemove({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      res.status(404).json({ message: error.message });
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
