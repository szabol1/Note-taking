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


function setCurrentUser(user){//sets current user/logs them in
    localStorage.setItem('users', JSON.stringify(user));
    console.log(user);

}

function getCurrentUser(){
    return JSON.parse(localStorage.getItem('users'));

}

let currentUser = getCurrentUser();

function removeCurrentUser(){

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
    fetchData("/user/login", cUser, "POST")//getting an error for log in
        .then((data) => {
            setCurrentUser(data);
            console.log(data);
            window.location.href = "note.html";
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
            window.location.href="note.html";
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })

}
class notes{
    constructor(user,contents, noteId){
        this.userId = user;
        this.contents = contents;
        this.noteId = noteId;
    }
    getNoteId(){
        return `${this.noteId}`;
    }
    getUserId(){
        return `${this.userId}`;
    }
    setNoteId(id){
        this.noteId = id;
    }
    setUserId(id){
        this.userId=id;
    }
    setContents(notes){
        this.contents = notes;
    }
    getContents(){
        return`${this.contents}`;
    }
}
let noteDoc =document.getElementById("notesForm");
if(noteDoc) noteDoc.addEventListener('submit', newNote);

function newNote(e){
    e.preventDefault();

    const note = document.getElementById("writing").value;
    let current =  getCurrentUser();//error here undefined
    console.log(current.userId);//user id is undefined

    let nte = new notes(current.userId, note);
    console.log(nte);

    fetchData("/notes/note", nte, "POST")
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })

}

let button = document.getElementById("button");
if(button)  button.addEventListener('click', getAllNotes);

function getAllNotes(e){
    e.preventDefault();

    let noteDisplay = document.getElementById("writing");//this is my text area

    let nte = new notes(currentUser.userId,null);
    console.log(nte);
    let p = document.querySelector('#writing');//says p is null

    fetchData("/notes/getNotes", nte, "POST")
        .then((data)=>{
            data.forEach((notes)=>{
                let p = document.createElement('p');
                p.class = "error";
                p.innerText+=notes.contents;
                console.log(notes.contents);
                p.innerText+=notes.contents;
            })
        })
        .catch((err)=>{
            console.log(err);
        })

}