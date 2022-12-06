const con = require("./sqlConnect");

async function createTable() {//creates notes table
    let sql=`CREATE TABLE IF NOT EXISTS notes (
    noteId INT NOT NULL AUTO_INCREMENT,
    postDate NUMERIC,
    userId NUMERIC,
    noteContents VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(noteId)
  ); `
    await con.query(sql);
}
createTable();

async function editNote(note){//not sure what to use to find this as the parameter- userID possibly? possibly add a title for notes?
    let sql = `UPDATE notes
                SET contents = "${note.contents}"
                WHERE userId = ${note.userId}`;
    await con.query(sql);
    let updatedNote = await getContents(note);
    return updatedNote;
}
async function deleteNote(note){
    let sql = `DELETE FROM notes
               WHERE noteId = ${note.noteId}`;
    await con.query(sql);
}
async function getContents(note){
    let sql = `SELECT * FROM notes(noteContents) 
               WHERE noteId = ${note.noteId}`;
    return con.query(sql);
}
async function createNote(note){
    let sql = `INSERT INTO notes(noteID, userID, postDate, noteContents) 
               WHERE userId = ${note.noteId}
               VALUES(${note.noteId}, ${note.userId}, ${note.postDate}, "${note.contents}")`;
    return con.query(sql);
}

async function getUserID(note) {
    let sql = ` SELECT userId FROM users 
      WHERE username = "${note.userId}"`;

    return con.query(sql);
}
module.exports = {
    createNote, getContents, editNote, deleteNote
}