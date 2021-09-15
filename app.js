const express = require("express")
const app = express();
const path = require("path");
const hbs = require("hbs");
const { registerPartials } = require("hbs");
require("./src/db/conn")
const User= require("./src/module/usermessage")


//setting path
const staticpath = path.join(__dirname,"../public") //<----called the path to css.html with staticpath in public folder
const templatepath = path.join(__dirname,"../Templates/views") ///<-------settting path in views folder inside templates
const partialpath = path.join(__dirname,"../Templates/partials") ///<--------settting path in partial folder inside templates



//middileware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css"))); //<-------linking bootstrapp jquery and js in index.hbs
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));//<-------linking bootstrapp jquery and js in index.hbs
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));//<-------linking bootstrapp jquery and js in index.hbs
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath)) // <-----connected the static path..
app.set("view engine","hbs");//<<---setting up view engineeee......
app.set("views",templatepath)//<<-----connecting view folder in templatepath
hbs.registerPartials(partialpath);



//routing
app.get("/", (req, res) => {
    res.render("index");
})


app.post("/contact",async(req,res) => {
try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
} catch (error) {
    res.status(500).send(error);
}
})



//server create
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on ${PORT} `))