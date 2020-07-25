const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./Routes/users');
const usersSessionRouter = require('./Routes/login');
const usersPedidos = require('./Routes/pedidos');

app.use('/users', usersRouter);
app.use('/account', usersSessionRouter);
app.use('/pedidos', usersPedidos);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})