const dbo = require("./conn");
const { saveToDatabase } = require("./utils");

const getAllAdmins = () => {
  try {
    console.log(dbo);
    return dbo;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  getAllAdmins,
};
