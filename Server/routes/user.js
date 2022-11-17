const express = require(`express`);
const User = require("../models/user");//lets you use any funciton exported in that models file
const router = express.Router();
router
    .get(`/`, async(req, res)=> {
        try {
            const users =await User.getUsers();
            res.send(users);
        } catch(err){
            res.status(401).send({message: err.message});
        }
    })
.post(`/login`, async(req,res)=>{
    try{
    let user = await User.login(req, body);
    res.send({...user, password: undefined})
    }catch(err){
        res.status(401).send({message})
    }
})
module.exports = router;
