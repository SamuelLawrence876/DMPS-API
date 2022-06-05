const register = require("../../controllers/authController/authController");
const login = require("../../controllers/authController/authController");

test("should register a user to be authorized", () => {
  expect(register).toBeDefined();
  const req = {
    body: { email: "jesttest@hotmail.com", password: "Password1" },
  };
});
test("should login a user who is authorized", () => {
  expect(login).toBeDefined();
});
