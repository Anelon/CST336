const express = require("express");
const app = express();
app.engine("html", require('ejs').renderFile);
app.use(express.static("public"));

//routes
app.get("/", function(req, res) {
    res.render("index.ejs");
});
app.get("/mercury", function(req, res) {
    res.send("Future home of Mercury");
});
app.get("/venus", function(req, res) {
    res.send("Future home of Venus");
});
app.get("/earth", function(req, res) {
    res.send("Future home of Earth");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Express server is running...");
});
/*
    //local
app.listen("8080", "127.0.0.1", function() {
    console.log("Express server is running...");
});
*/
