require('dotenv').config();
const express = require(`express`);
const app = express();
const path = require("path")
const userRoutes = require("./Server/routes/user");//connects to
const noteRoutes = require("./Server/routes/notes");

app.use(express.json());

app.use(express.static(__dirname + "/public"))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "/public/login.html")))

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
})
app.use("/user", userRoutes);
app.use("/notes", noteRoutes)

const PORT = process.env.PORT || 3000;//sets port

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));//listens to and starts port connection



