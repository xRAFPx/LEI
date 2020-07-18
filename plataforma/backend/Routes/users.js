const router = require('express').Router();
let user = require('../Models/user.model');
const User = require('../Models/user.model');

router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res)=>{
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Password = req.body.Password;

    const newUser = new User({Name,Email,Password});

    newUser.save()
        .then(()=> res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/findUser/:email/:password').get((req,res)=>{
    User.find({Email: req.params.email,Password: req.params.password})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: '+ err))
})

module.exports = router;