const express = require('express');
const router = express.Router();
const { sendEmail } = require('../mail');

router.post('/send', (req, res, next) => {

  try{
    sendEmail(req.body);
  } catch(e) {console.log(e);}

  // var content = `name: ${name} \n email: ${email} \n message: ${content} `

  // var mail = {
  //   from: name,
  //   to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  //Change to email address that you want to receive messages on
  //   subject: 'New Message from Contact Form',
  //   text: content
  // }     
  setTimeout(() => { 
    var options = {
        host: "localhost",
        port: 5000,
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
})


module.exports = router;