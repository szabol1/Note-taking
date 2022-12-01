const users = [
    {
        userid: 12345,
        username: "catchy124",
        password: "mypassword"
    },
    {
        userId: 55555,
        userName: "fredburger",
        password: "milk"
    },
    {
        userId: 23412,
        userName: "bobbyjones",
        password: "frogs"
    }

];
function getUsers(){
    return users;
}
async function findUser(userName){
    let sql = 'SELECT * FROM USERS WHERE USERNAME = ${userName}';
    let user = await con.query(sql);
    return user;
}

async function login(user){//object literal with username from form and password that was entered
    let cUser = await findUser(user.userName) ;
    if(!cUser[0]) throw Error("Username not found");
    if(!cUser[0].password !== user.password) throw Error("wrong password");

    return cUser[0];

}
module.exports = {
    getUsers, login
}