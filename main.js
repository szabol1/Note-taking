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
    constructor(id, fName, lName, uName, password){
        this.userId = id;
        this.firstName = fName;
        this.lastName = lName;
        this.username =uName;
        this.password = password;
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
fetchData("/user/login", users, "POST")
    .then((data) => {
        console.log(data);
        window.location.href = "login.html";
    })
    .catch((err) => {
        console.log(`Error!!! ${err.message}`)
    })
function fetchData(){

}

let register = document.getElementById("registerForm");

if(register) register.addEventListener('submit', addUser);

function addUser(e){
    e.preventDefault();

    const first = document.getElementById("name").value;
    const last = document.getElementById("last").value;
    const usern = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const newUser = new users( first, last, usern, password);
    console.log(newUser.getUserId() + ", " + newUser.getFirstName()+ ", " + newUser.getLastName() + ", " + newUser.getUserName() + ", " + newUser.getPassword());

}

let log = document.getElementById("loginForm");
if(log) log.addEventListener("submit", login);

function login(e){
    e.preventDefault();
    const first = document.getElementById("Username").value;
    const second = document.getElementById("Password").value;
    //check if(user and password == anything in database?) cant create second constructor for just log in..not sure what to do here since we dont have values assigned to userIDs yet
    let cUser = new user(1,"firstName", "LastName", first, second);
    console.log(cUser.getUserName() + "was logged in");

}
class notes{
    constructor(noteId,user, postDate, contents){
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
    let postID = Math.floor((Math.random()*(100000000-1+1)+1));
    let nte = new notes(postID, 1, todaysDate, note);

    //again no assignments for userIDs or notes yet so not sure what to put in for those besides maybe Math.random()
;    console.log(nte.getNoteId() + " " + nte.getUserId(), " " + nte.getPostDate() + " " + nte.getContents());

}