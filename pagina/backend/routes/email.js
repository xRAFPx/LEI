const mailer = require("nodemailer");
const creds = require('../config/credentials');
const express = require('express');
const router = express.Router();
let fs = require('fs');

const smtpTransport = mailer.createTransport({
  service: "Gmail",
  auth: {
      user: creds.USER,
      pass: creds.PASS
  }
})

smtpTransport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {

  var tipoPedido = req.body.tipoPedido
  var naturezaPedido = req.body.naturezaPedido
  var servico = req.body.servico
  var requesitante = req.body.requesitante
  var email = req.body.email
  var contacto = req.body.contacto
  var descricao = req.body.descricao
  var prioridade = req.body.prioridade
  var imagem = req.body.imagem
  var ficheiros = req.body.ficheiros
  console.log(imagem)
  var emailStructure = `<!DOCTYPE html>
   <html style="margin: 0; padding: 0;">
       <head>
           <title>Dados</title>
       </head>
           <body style="margin: 0; padding: 0;">
              <label>Tipo de pedido: `+ tipoPedido +`</label><br />
              <label>Natureza de pedido: `+ naturezaPedido +`</label><br />
              <label>Servico: `+ servico +`</label><br />
              <label>Requesitante: `+ requesitante +`</label><br />
              <label>Email: `+ email +`</label><br />
              <label>Contacto: `+ contacto +`</label><br />
              <label>Descricao: `+ descricao +`</label><br />
              <label>Prioridade: `+ prioridade +`</label><br />
           </body>
     </html>`
  
  fs.writeFile("screenshot.png", imagem, 'base64', function(err) {
    if(err) {
        console.log(err);
    }
    else{
      console.log('entrei')
      var anexos = ficheiros.push({ filename: 'screenshot.png', path: 'screenshot.png', content: imagem})
      data = {
        from: "Formulario",
        to: "a1234cavado@gmail.com",
        subject: `Pedido`,
        html: emailStructure,
        attachments: anexos
     }
  
    smtpTransport.sendMail(data, function(error, response) {
      if(error) {
          console.log(error)
          res.json({
            message: 'fail'
          })
      } else {
          console.log( "email sent successfully")
          res.json({
            message: 'success'
          })
      }
      smtpTransport.close();
    })
}});

  
  // var content = `name: ${name} \n email: ${email} \n message: ${content} `

  // var mail = {
  //   from: name,
  //   to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  //Change to email address that you want to receive messages on
  //   subject: 'New Message from Contact Form',
  //   text: content
  // }

  

     
})

module.exports = router;