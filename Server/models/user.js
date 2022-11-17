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
function login(user){//object literal with username from form and password that was entered
    let cUser = users.filter(u=>u.username==user.username);
    if(!cUser[0]) throw Error("Username not found");
    if(!cUser[0].password !== user.password) throw Error("wrong password");


}
module.exports = {
    getUsers
}