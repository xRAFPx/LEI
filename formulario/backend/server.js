const express = require('express');
const cors = require('cors');
const path = require("path");
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "..", "src")));
app.use(express.static(path.join(__dirname, "..", "public")));

const emailRouter = require('./routes/email');
app.use('/form', emailRouter);


//if an error occurs
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404
    next(error)
})
  
//way to show the error in json
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
  
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

})
  
 app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;