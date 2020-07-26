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
})

module.exports = router;