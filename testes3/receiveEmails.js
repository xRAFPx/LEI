const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const Pedidos = require('./userPedidos.model');

const getEmails = () => {

    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://mail.google.com/'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = 'token.json';

    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), listMessages);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
        });
    });
    }

    /**
     * Lists the labels in the user's account.
     *
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    function listMessages(auth) {
    try{
        const userID = 'a1234cavado@gmail.com';
        const gmail = google.gmail({version: 'v1', auth});
        gmail.users.messages.list({
            'userId': userID,
            'q': 'is:unread is:sent'
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const messages = res.data.messages;
            if (messages != undefined && messages.length) {        
                readMessages(gmail, userID, messages);
                changeMessages(gmail, userID, messages)
            } else {
            console.log('No messages found.');
            }
        });
    } catch(e) {console.log(e);}
    }

    function readMessages(gmail, userID, messages){
    try{
        messages.forEach((message) => {
            const messageID = message.id;
            gmail.users.messages.get({
                'id': messageID,
                'userId': userID
            }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    // console.log(res.data.snippet); //dados do formulario
                    translateEmail(res.data.snippet);
                    const parts = res.data.payload.parts;
                    if (messages.length) {
                        readAttachements(gmail, userID, messageID, parts);
                    } else {
                        console.log('No messages found.');
                    }
                });
            });
        } catch(e) {console.log(e);}
    }

    function changeMessages(gmail, userID, messages){
    try{
        messages.forEach((message) => {
        const messageID = message.id;
        gmail.users.messages.modify({
            'userId':userID,
            'id':messageID,
            'resource': {
                'removeLabelIds': ['UNREAD']
            }
        }, function(err) {
        if (err) {
            console.error('Failed to mark email as read! Error: '+ err);
            return;
        }
        //console.log('Successfully marked email as read', messageID);
        });
    });
    } catch(e) {console.log(e);}
    }

    function translateEmail(message){
        var data = message.split(';');
        var pedido = new Pedidos();
        pedido.TipoDePedido = data[0].replace("Tipo de pedido: ", "");
        pedido.NaturezaDePedido = data[1].replace(" Natureza de pedido: ", "");
        pedido.Servico = data[2].replace(" Servico: ", "");
        pedido.Requisitante = data[3].replace(" Requesitante: ", "");
        pedido.Email = data[4].replace(" Email: ", "");
        pedido.Contacto = data[5].replace(" Contacto: ", "");
        pedido.Erro = data[6].replace(" Erro: ", "");
        pedido.Descricao = data[7].replace(" Descricao: ", "");
        pedido.Prioridade = data[8].replace(" Prioridade: ", "");
        pedido.save();
    }

    function readAttachements(gmail, userID, messageID, parts){
    try{
        parts.forEach((file) => {
        // console.log(file.filename); //nome do ficheiro
        const idAttach = file.body.attachmentId;
        if(idAttach != undefined){
            gmail.users.messages.attachments.get({
            'userId': userID,
            'messageId': messageID,
            'id': idAttach,
            }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            let data = res.data.data;
            let buff = Buffer.from(data, 'base64');
            let text = buff.toString('utf-8');
            // console.log(text); //conteudo do ficheiro
            });
        // } else {
        //   let data = file.body.data;
        //   let buff = Buffer.from(data, 'base64');
        //   let text = buff.toString('utf-8');
        //   console.log(text); //html do email
        }
        
        });
    } catch(e) {console.log(e);}
    }
}
module.exports = {getEmails};