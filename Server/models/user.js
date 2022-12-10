const con = require("./sqlConnect");

async function createTable() {
    let sql=`CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    userID INT NOT NULL AUTO_INCREMENT,
    CONSTRAINT userPK PRIMARY KEY(userID)
  ); `
    await con.query(sql);
}
createTable();

async function editUser(user){
    let sql
    if(user.username) {
        sql=`UPDATE users
    SET username = "${user.username}"
    WHERE userId = ${user.userId}`;
    } else if(user.firstName){
        sql=`UPDATE users
        SET firstName = "${user.firstName}"
        WHERE userId =${user.userId}`;
    } else if(user.lastName){
        sql= `UPDATE users
        SET lastName = "${user.lastName}"
        WHERE userId = ${user.userId}`
    }
    await con.query(sql);
    let updatedUser = await findUser(user);
    return updatedUser;
}
async function deleteUser(user){
    let sql = `DELETE FROM users
        WHERE userId = ${user.userId}`;
    await con.query(sql);
}
async function getAllUsers(){
    let sql = `SELECT * FROM users;`;
    let users = await con.query(sql);
    console.log(users);
}

async function findUser(user) {
    let sql;
    if (user.userId) {
        sql = `
      SELECT * FROM users
       WHERE userId = ${user.userId}
    `
    } else sql = `
    SELECT * FROM users 
      WHERE username = "${user.username}"
  `;

    return await con.query(sql);
}

async function login(user){//object literal with username from form and password that was entered
    let cUser = await findUser(user) ;
    if(!cUser[0]) throw Error("Username not found");
    if(cUser[0].password !== user.password) throw Error("wrong password");

    return cUser[0];

}

async function register(user){
    let userExists = await findUser(user);
    if(userExists.length>0) throw Error("Username already exists");

    let sql = `INSERT INTO users(username, password, firstName, lastName) 
               VALUES("${user.username}", "${user.password}","${user.firstName}", "${user.lastName}")`;
    await con.query(sql);
    return await login(user);
}

module.exports = {
    findUser, login, register, editUser, deleteUser, getAllUsers
}