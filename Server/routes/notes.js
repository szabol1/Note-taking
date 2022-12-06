const express = require(`express`);
const notes = require("../models/notes");

//lets you use any funciton exported in that models file
const router = express.Router();
router
    .get(`/`, async(req, res)=> {
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
            res.status(401).send({message})
        }
    })
module.exports = router;