import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));


const port = 3000;
const app = express();
var authorized = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkpassword);

function checkpassword(req,res,next){
    const password = req.body["password"];
    if(password == "ILoveProgramming"){
        authorized = true;
    }
    next();
}


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})


app.post("/check", (req, res) => {
    if (authorized) {
        res.sendFile(__dirname +"/public/secret.html")
    }
    else{
        res.redirect("/");
    }
})

app.listen(port);
//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
