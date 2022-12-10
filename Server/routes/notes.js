const express = require(`express`);
const notes = require("../models/notes");
const User = require("../models/user");

//lets you use any funciton exported in that models file
const router = express.Router();
router
    .get(`/getNotes`, async(req, res)=> {//use this to display notes
        try {
            const Notes = await notes.getContents();
            res.send(Notes);
        } catch(err){
            res.status(401).send({message: err.message});
        }
    })
    .post(`/note`, async(req,res)=>{
        try{
            const Notes = await notes.createNote(req.body);
            res.send(Notes);
        }catch(err){
            res.status(401).send({message: err.message})
        }
    })
    .put('/edit', async(req,res)=>{
        try{
            let editNote = await notes.editNote(req.body);
            res.send({editNote, password:undefined});
        }catch(err){
            res.status(401).send({message: err.message})
        }
    })
    .delete('/delete', async(req, res)=>{
        try{
            await notes.deleteNote(req.body);
            res.send({success: "Goodbye!"})
        } catch(err){
            res.status(401).send({message: err.message})
        }
    })
module.exports = router;