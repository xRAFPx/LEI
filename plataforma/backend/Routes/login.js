const router = require('express').Router();
let userSession = require('../Models/userSession.model');
const UserSession = require('../Models/user.model');
let user = require('../Models/user.model');
const User = require('../Models/user.model');

router.route('/login').post((req,res)=>{
    User.find({Email: req.body.Email})
        .then(users => res.json(users))
    
});

module.exports = router;