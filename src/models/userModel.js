const fs = require('fs');

let users = [];

try {
  const data = fs.readFileSync("./src/users.txt", "utf8");
  users = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
} catch (error) {
  console.log(error);
}

/* const user = {
    id,
    userName,
    lastName,
    password,
    gender,
    birthday,
    email,
    photo,
    posts,
    messages,
    stories,
    friends,
} */

/* let users = [] */

const add = (name, lastName, email, password) => {
    users.push({
        name,
        lastName,
        email,
        password,
    });
    fs.writeFileSync('./src/users.txt', JSON.stringify(users))
    console.log(users);
}

const getUsers = () => {
    return users
}

module.exports = {add, getUsers}
