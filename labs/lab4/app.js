const express = require("express");
const app = express();
app.engine("html", require('ejs').renderFile);
app.set('port',  process.env.PORT || "8080");
app.set('ip',  process.env.IP || "0.0.0.0");
app.use(express.static("public"));

//routes
app.get("/", function(req, res) {
    res.render("index.ejs");
});
app.get("/mercury", function(req, res) {
    res.render("mercury.ejs");
});
app.get("/venus", function(req, res) {
    res.render("venus.ejs");
});
app.get("/earth", function(req, res) {
    res.render("earth.ejs");
});

app.listen(app.get('port'), app.get('ip'),()=>{console.log("Express Server is Running...");});

/*
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Express server is running...");
});
*/
/*
    //local
app.listen("8080", "127.0.0.1", function() {
    console.log("Express server is running...");
});
*/
