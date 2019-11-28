const express = require("express");
const request = require("request");
const tools = require("./tools.js");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.set('port',  process.env.PORT || "8080");
app.set('ip',  process.env.IP || "127.0.0.1");



//routes
app.get("/", async function(req, res) {
    var imgUrls = await tools.getRandomImages();
    console.log(imgUrls);
    res.render("index", {"imgUrl":imgUrls[0]});
});

app.get("/search", async function(req, res) {
    let keyword = req.query.keyword;
    let imgCount = 9;
    var imgUrl = await tools.getRandomImages();
    
    var imgUrls = await tools.getRandomImages(keyword, imgCount);
    res.render("search", {"imgUrls":imgUrls, "keyword":keyword, "imgUrl":imgUrl});
});

app.get("/favorites", async function(req, res) {
    let conn = tools.getConnection();
    var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";
    var imgUrl = await tools.getRandomImages();
    conn.connect(function(err) {
        if(err) throw err;
        conn.query(sql, function(err, result) {
            if(err) throw err;
            res.render("favorites", {"rows":result, "imgUrl":imgUrl});
        });
    });
    
});

app.get("/api/updateFav", async function(req, res) {
    let conn = tools.getConnection();
    if(req.query.insert == "insert") {
        var sql = "INSERT INTO favorites (url, keyword) VALUES (?, ?)";
        var sqlParams = [req.query.imageURL, req.query.keyword];
    } else {
        var sql = "DELETE FROM favorites WHERE url = ?";
        var sqlParams = [req.query.imageURL];
    }
    conn.connect(function(err) {
        if(err) throw err;
        conn.query(sql, sqlParams, function(err, result) {
            if(err) throw err;
        });
    });
    
    res.send("Updated");
});

app.get("/api/getFav", async function(req, res) {
    let conn = tools.getConnection();
    var sql = "SELECT url FROM favorites WHERE keyword=?";
    var sqlParams = [req.query.keyword];
    conn.connect(function(err) {
        if(err) throw err;
        conn.query(sql, sqlParams, function(err, result) {
            if(err) throw err;
            res.send(result);
        });
    });
    
});

app.listen(app.get('port'), app.get('ip'),()=>{console.log("Express Server is Running...");});
