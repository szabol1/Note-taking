async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
        method: methodType, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
        return await response.json(); // parses JSON response into native JavaScript objects
    } else {
        throw await response.json();
    }
}

class users{
    constructor(uName, password, fName, lName, id ){//IMPORTANT--the order was switched here to have username and pass in beginning and ID at the end so you need to update order for functions where you created a new user
        this.username =uName;
        this.password = password;
        this.firstName = fName;
        this.lastName = lName;
        this.userId = id;
    }
    getFirstName(){
        return `${this.firstName}`;
    }
    getLastName(){
        return `${this.lastName}`;
    }
    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
    getUserId(){
        return `${this.userId}`;
    }
    getUserName(){
        return `${this.username}`;
    }
    getPassword(){
        return `${this.password}`;
    }
    setFirstName(name){
        this.firstName=name;
    }
    setLastName(name){
        this.lastName=name;
    }
    setUserName(name){
        this.username=name;
    }
    setPassword(pass){
        this.password = pass;
    }

}



function addUser(e){
    e.preventDefault();

    const first = document.getElementById("name").value;
    const last = document.getElementById("last").value;
    const usern = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const newUser = new users( usern, password, first, last);
    console.log(newUser.getUserId() + ", " + newUser.getFirstName()+ ", " + newUser.getLastName() + ", " + newUser.getUserName() + ", " + newUser.getPassword());

}

function setCurrentUser(user){//sets current user/logs them in
    localStorage.setItem('users', JSON.stringify(user));

}

function getCurrentUser(){
    return localStorage.getItem(JSON.parse("users"))
}

let log = document.getElementById("loginForm");
if(log) log.addEventListener("submit", login);

function login(e){
    e.preventDefault();
    const first = document.getElementById("Username").value;
    const second = document.getElementById("Password").value;
    //check if(user and password == anything in database?) cant create second constructor for just log in..not sure what to do here since we dont have values assigned to userIDs yet
    let cUser = new users(first, second);
    console.log(cUser);
    fetchData("/user/log", users, "POST")//getting an error for log in
        .then((data) => {
            setCurrentUser(data);
            console.log(data);
            window.location.href = "login.html";
        })
        .catch((err) => {
            console.log(`Error!!! ${err.message}`)
        })

}
let regForm = document.getElementById("registerForm");
if(regForm) regForm.addEventListener('submit', register);//register function connection

function register(e){//not working not even printing user anymore for some reason
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let firstName = document.getElementById("name").value;
    let last = document.getElementById("last").value;
    let nuser = new users(username, password, firstName, last);

    console.log(nuser);

    fetchData("/user/register", nuser, "POST")//having issues not working for me
        .then((data)=>{
            setCurrentUser(data);
            window.location.href="notes.html";
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })

}
class notes{
    constructor(user, postDate, contents, noteId,){
        this.noteId = noteId;
        this.userId = user;
        this.postDate = postDate;
        this.contents = contents;
    }
    getNoteId(){
        return `${this.noteId}`;
    }
    getUserId(){
        return `${this.userId}`;
    }
    getPostDate(){
        return `${this.postDate}`;
    }
    setNoteId(id){
        this.noteId = id;
    }
    setUserId(id){
        this.userId=id;
    }
    setPostDate(date){
        this.postDate=date;
    }
    setContents(notes){
        this.contents = notes;
    }
    getContents(){
        return`${this.contents}`;
    }
}
let noteDoc =document.getElementById("notesForm");
if(noteDoc) noteDoc.addEventListener("submit", newNote);

function newNote(e){//does a user activate this?
    e.preventDefault();

    const note = document.getElementById("writing").value;
    let date = new Date();
    let todaysDate = String(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    let current = getCurrentUser();

    let nte = new notes(current.userId, todaysDate, note);

    //again no assignments for userIDs or notes yet so not sure what to put in for those besides maybe Math.random()
;    console.log(nte.getNoteId() + " " + nte.getUserId(), " " + nte.getPostDate() + " " + nte.getContents());

}