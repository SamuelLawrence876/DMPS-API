const adminService = require("../service/adminService");

const getAllAdmins = (req, res) => {
  try {
    const allAdmins = adminService.getAllAdmins();
    res.send({ status: "OK", data: allAdmins });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "fail", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllAdmins,
};
