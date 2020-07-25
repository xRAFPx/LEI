const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http')

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const { sendEmail } = require('./mail');


app.post("/api/sendMail", (req, res) => {
    sendEmail(req.body);
    
    setTimeout(() => { 
        var options = {
            host: "localhost",
            port: 6000,
            path: "/api/receiveEmail",
            method: "POST"
        };
        
        var req = http.request(options, function (res) {
            var responseString = "";
        
            res.on("data", function (data) {
                responseString += data;
                // save all the data from response
            });
            res.on("end", function () {
                console.log(responseString); 
                // print to console when response ends
            });
        });
        var reqBody = "sometext";
        req.write(reqBody);
        req.end();
    }, 2000);

    res.send('Done');
})


app.listen(5000,  () => {
    console.log( "Server Running at 5000 ");
})