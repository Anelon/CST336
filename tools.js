let baseURL = "https://api.unsplash.com/";
let randURL = "photos/random/?";
let clientId = "client_id=2916cdfc5b3b7719814c0fdc8b5f5e6421f8c92ea5dff1a1405dab04a023a07c"
const request = require("request");
const mysql = require("mysql");
    
module.exports = {
    getRandomImages: function (keyword="", imgCount=1) {
        let url = baseURL + randURL + clientId + "&count=" + imgCount;
        if(keyword != "") url += "&query=" + keyword;
        
        return new Promise(function (resolve, reject) {
            request(url, function(error, response, body) {
                if(!error) {
                    var parsedData = JSON.parse(body);
                    let imgUrls = [];
                    for(let i = 0; i < imgCount; i++) {
                        imgUrls.push(parsedData[i].urls.regular);
                    }
                    resolve(imgUrls);
                    
                } else {
                    console.log("error: there was an error searching for imgs");
                }
            });
        });
    }
    ,
    getRandomImages_cb: function(keyword="", imgCount=1, callback) {
        let url = baseURL + randURL + clientId;
        if(keyword != "") url += "&query=" + keyword + "&count=" + imgCount;
        request(url, function(error, response, body) {
            if(!error) {
                var parsedData = JSON.parse(body);
                let imgUrls = [];
                for(let i = 0; i < imgCount; i++) {
                    imgUrls.push(parsedData[i].urls.regular);
                }
                callback(imgUrls);
                //console.log(imgUrls);
            } else {
                console.log("error: there was an error searching for imgs");
            }
        });
    }
    ,
    getConnection: function() {
        return mysql.createConnection({
            host: "a07yd3a6okcidwap.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            port: "3306",
            user: "yu4q9qeq4ztff852",
            password: "b0i1cmwccmij1zva",
            database: "iulijvv5d0p0h2l3"
        });
    }
}