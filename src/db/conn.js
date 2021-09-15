const mongoose = require("mongoose");

///creeatiing database
mongoose.connect("mongodb://localhost:27017/wizard", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successfull")
}).catch((err) => {
    console.log(err);
})

