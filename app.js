const express = require("express");
var faker = require('faker');

const app = express();
app.engine("html", require('ejs').renderFile);
app.set('port',  process.env.PORT || "8080");
app.set('ip',  process.env.IP || "0.0.0.0");
app.use(express.static("public"));

const name = faker.name.findName();
const email = faker.internet.email();
const data = {"name": name, "email": email};

//routes
app.get("/", function(req, res) {
    res.render("index.ejs", data);
});
app.get("/games", function(req, res) {
    res.render("games.ejs", data);
});
app.get("/compiling", function(req, res) {
    res.render("compiling.ejs", data);
});
app.get("/why", function(req, res) {
    res.render("why.ejs", data);
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
