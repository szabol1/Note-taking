const con = require("./sqlConnect");

async function createTable() {//if post date is an issue due to 10/10/10 format just get rid of it
    let sql=`CREATE TABLE IF NOT EXISTS notes (
    userId INT NOT NULL,
    contents VARCHAR(255),
    noteId INT NOT NULL AUTO_INCREMENT,
    CONSTRAINT usersPK PRIMARY KEY(noteId),
    CONSTRAINT notesFK FOREIGN KEY(noteId) references users(userId)
  ); `
    await con.query(sql);
}
createTable();

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

async function editNote(note){//not sure what to use to find this as the parameter- userID possibly? possibly add a title for notes?
    let sql = `UPDATE notes
                SET contents = "${note.contents}"
                WHERE noteId = ${note.noteId}`;
    await con.query(sql);
    let updatedNote = await getContents(note);
    return updatedNote;
}
async function deleteNote(note){
    let sql = `DELETE FROM notes
               WHERE noteId = ${note.noteId}`;
    await con.query(sql);
}
async function getContents(){//use this to display notes
    let sql = `SELECT contents FROM notes`;
    return con.query(sql);
}
async function createNote(note){

    let sql = `INSERT INTO notes(userId, contents, noteId) 
               WHERE note.userId = ${note.userId}
               VALUES(${note.userId}, "${note.contents}", ${note.noteId})`;
    return con.query(sql);
}

module.exports = {
    createNote, getContents, editNote, deleteNote
}