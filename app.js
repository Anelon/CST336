const express = require("express");
const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.set('port',  process.env.PORT || "8080");
app.set('ip',  process.env.IP || "127.0.0.1");



//routes
app.get("/", async function(req, res) {
    var imgUrls = await tools.getRandomImages();
    res.render("index", {"imgUrl":imgUrls[0]});
    /*
    let url = baseURL + randURL + clientId;
    request(url, function(error,response,body) {
        if(!error) {
            var parsedData = JSON.parse(body);
            var imgUrl = parsedData.urls.regular;
            res.render("index", {"imgUrl":imgUrl});
        } else {
            res.render("index", {"error":"there was an error"});
        }
    });
    */
});

app.get("/search", async function(req, res) {
    let keyword = req.query.keyword;
    let imgCount = 9;
    
    var imgUrls = await tools.getRandomImages(keyword, imgCount);
    res.render("search", {"imgUrls":imgUrls});
    
    /*
    getRandomImages_cb(keyword, imgCount, function(imgUrls){
        res.render("search", {"imgUrls":imgUrls});
    });
    */
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
