const express = require(`express`);
const app = express();
const userRoutes = require("./Server/routes/user");//connects to
const {json} = require("express");

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control_Allow-Header", "Origin, X_Requested-With, Content-Ty[e, Accept, Authorization");
    res.header("Access-Control-Allow_methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
})
app.use(express,json());
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;//sets port

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));//listens to and starts port connection



