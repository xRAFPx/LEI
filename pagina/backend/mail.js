const mailer = require("nodemailer");
const creds = require('./config/Credentials');

const getEmailData = (body, html) => {
    let data = null;

    data = {
        from: "Formulario",
        to: "a1234cavado@gmail.com",
        subject: `Pedido`,
        html: html,
        attachments: body.ficheiros
    }

    return data;
}

const getEmailHtml = (body) => {
    return `
    <!DOCTYPE html>
   <html style="margin: 0; padding: 0;">
   
       <head>
           <title>Dados</title>
       </head>
           <body style="margin: 0; padding: 0;">
              <label>Tipo de pedido: `+ body.tipoPedido +`</label><br />
              <label>Natureza de pedido: `+ body.naturezaPedido +`</label><br />
              <label>Servico: `+ body.servico +`</label><br />
              <label>Requesitante: `+ body.requesitante +`</label><br />
              <label>Email: `+ body.email +`</label><br />
              <label>Contacto: `+ body.contacto +`</label><br />
              <label>Descricao: `+ body.descricao +`</label><br />
              <label>Prioridade: `+ body.prioridade +`</label><br />
           </body>
   
     </html>
    `
    // <label>Erro: `+ body.erro +`</label><br />
    ;
}


const sendEmail = (body) => {

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

    const html = getEmailHtml(body)

    const mail = getEmailData(body, html)

    smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log( "email sent successfully")
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }