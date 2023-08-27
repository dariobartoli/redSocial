const userModel = require("../models/userModel");
const fs = require("fs");

let users = [];

try {
  const data = fs.readFileSync("./src/users.txt", "utf8");
  users = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
} catch (error) {
  console.log(error);
}

const userAdd = (name, lastName, email, password) => {
  userModel.add(name, lastName, email, password);
};

const userShow = () => {
  return userModel.getUsers();
};

module.exports = { userAdd, userShow };
