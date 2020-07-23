const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const {getEmails} = require('./receiveEmails');

app.post("/api/receiveEmail", (req, res) => {
  var dados = getEmails();
  // console.log(dados);
  res.send('Done')
})


app.listen(6000,  () => {
    console.log( "Server Running at 6000 ");
})