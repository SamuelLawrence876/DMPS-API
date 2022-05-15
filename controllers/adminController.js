const adminService = require("../service/adminService");

const getAllAdmins = (req, res) => {
  try {
    const allAdmins = adminService.getAllUsers();
    let db_connect = allAdmins.getDb("employees");
    db_connect
      .collection("records")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    res.send({ status: "OK", data: allAdmins });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllAdmins,
};
