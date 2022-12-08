const express = require(`express`);
const User = require("../models/user");

//lets you use any funciton exported in that models file
const router = express.Router();
router
    .get('/getUsers', async(req, res)=> {
        try {
            const users =await User.getAllUsers();
            res.send(users);
        } catch(err){
            res.status(401).send({message: err.message});
        }
    })
    .post('/login', async(req,res)=>{
        try{
            let users = await User.login(req.body);
            res.send({...users, password: undefined})
        }catch(err){
            res.status(401).send({message: err.message})
        }
    })
    .post('/register', async(req, res)=>{//could it be route path?? what else should it be
        try{
            console.log(req.body)
            let newUser = await User.register(req.body);
            res.send({...newUser, password: undefined})
        } catch(err){
            res.status(401).send({message: err.message});
        }
    })
    .put('/edit', async(req,res)=>{
        try{
            let editUser = await User.editUser(req.body);
            res.send({editUser, password:undefined});
        }catch(err){
            res.status(401).send({message: err.message})
        }
    })
    .delete('/delete', async(req, res)=>{
        try{
            let deletedUser = await User.deleteUser(req.body);
            res.send({success: "Goodbye!"})
        } catch(err){
            res.status(401).send({message: err.message})
        }
    })

module.exports = router;
