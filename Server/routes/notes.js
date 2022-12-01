const express = require(`express`);
const notes = require("../models/notes");//lets you use any funciton exported in that models file
const router = express.Router();
router
    .get(`/`, async(req, res)=> {
        try {
            const Notes =await notes.getNotes();
            res.send(notes);
        } catch(err){
            res.status(401).send({message: err.message});
        }
    })
    .post(`/note`, async(req,res)=>{
        try{
            let notes = await Notes.getNotes(req.body);
            res.send({...notes, notes.getContents());
        }catch(err){
            res.status(401).send({message})
        }
    })
module.exports = router;