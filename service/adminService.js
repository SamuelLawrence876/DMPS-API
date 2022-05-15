const { v4: uuid } = require("uuid");
const Admin = require("../dataService/Admin");

const getAllAdmins = () => {
  try {
    const allAdmins = Admin.getAllAdmins();
    return allAdmins;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAdmins,
};
