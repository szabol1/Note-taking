class user{
    constructor(id, fName, lName, uName, password){
        this.userId = id;
        this.firstName = fName;
        this.lastName = lName;
        this.username =uName;
        this.password = password;
    }
    constructor(uName, password) {
        this.username = uName;
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

let register = document.getElementById("registerForm");
register.addEventListener('registerSubmission', addUser);

function addUser(e){
    e.preventDefault();

    const first = document.getElementById("name").value;
    const last = document.getElementById("last").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    const newUser = new user(1, first, last, user, password);
    console.log(newUser);

}
let log = document.getElementById("login");
log.addEventListener("loginSubmission", login);

function login(e){
    e.preventDefault();
    const first = document.getElementById("Username").value;
    const second = document.getElementById("Password").value;
    const user = new user(first, second);
    console.log(user);
    //check if(user == anything in database?)
}
class notes{
    constructor(noteId,userid, postDate, contents){
        this.noteId = noteId;
        this.userId = userid;
        this.postDate = postDate;
        this.contents = contents;
    }
    getNoteId(){
        return `${this.noteId}`;
    }
    getUserId(){
        return `${this.userId};`
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
let note =document.getElementById("notes");
note.addEventListener("notesSubmission", newNote);

function newNote(e){//does a user activate this?
    e.preventDefault();

    const note = document.getElementById("writing");
    var date = new Date();
    var todaysDate = String(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());

    const newNte = new notes(Math.random(),this.getUserId(), todaysDate, note);

}