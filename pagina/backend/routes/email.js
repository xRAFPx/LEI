const express = require('express');
const router = express.Router();
const mailer = require("nodemailer");
const creds = require('../config/credentials');

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

  const htmlContent = `
  <!DOCTYPE html>
 <html style="margin: 0; padding: 0;">  
     <head>
         <title>Dados</title>
     </head>
         <body style="margin: 0; padding: 0;">
            <label>Tipo de pedido: `+ req.body.tipoPedido +`;</label><br/>
            <label>Natureza de pedido: `+ req.body.naturezaPedido +`;</label><br/>
            <label>Servico: `+ req.body.servico +`;</label><br/>
            <label>Requesitante: `+ req.body.requesitante +`;</label><br/>
            <label>Email: `+ req.body.email +`;</label><br/>
            <label>Contacto: `+ req.body.contacto +`;</label><br/>
            <label>Erro: `+ req.body.erro +`;</label><br/>
            <label>Descricao: `+ req.body.descricao +`;</label><br/>
            <label>Prioridade: `+ req.body.prioridade +`</label><br/>
         </body>
   </html>
  `;

  let data = null;

    if (req.body.imagem != null)
    {
      req.body.ficheiros.push(req.body.imagem);
    }

    if (req.body.ficheiros.length > 0)
    {
        data = {
            from: "Formulario",
            to: "lei.project2020@gmail.com",
            subject: `Pedido`,
            html: htmlContent,
            attachments: req.body.ficheiros
        }
    }
    else
    {
        data = {
            from: "Formulario",
            to: "lei.project2020@gmail.com",
            subject: `Pedido`,
            html: htmlContent
        }
    }


  smtpTransport.sendMail(data, function(error, response) {
    if(error) {
        console.log(error)
        return res.send({message: 'fail'})
    } else {
        console.log( "email sent successfully")
        return res.send({message: 'success'})
    }
    smtpTransport.close();
})
    
})

module.exports = router;