const router = require('express').Router();
let user = require('../Models/user.model');
const User = require('../Models/user.model');
const bcrty = require ('bcrypt');
const saltFactor = 10;

router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res)=>{
    const Name = req.body.Name;
    const Email = req.body.Email;
    let Password = req.body.Password;
    bcrty.genSalt(saltFactor, function(err, salt){
        if(err){
            return (err);
        }
        bcrty.hash(Password,salt, function(err,hash){
            if(err){
                return(err);
            }
            Password = hash;
            const newUser = new User({Name,Email,Password});
                newUser.save()
                  .then(()=> res.json(hash))
                  .catch(err => res.status(400).json('Error: '+ err));
        })
    })
    

    
});

 router.route('/findUser/:email/:password').get((req,res)=>{

    try{
        User.findOne({Email: req.params.email})
        .then(user => {
                bcrty.compare(req.params.password,user.Password,function(err,isMatch){
                    if(err){
                        res.send("erro");
                    }
                    else{
 
                        return res.send({
                            success: isMatch
                        });
                    }
                })
        });
    }catch (error){
        return res.send({
            success: false
        })
    }
});

router.route('/update').post((req,res)=>{
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Role = req.body.Role;
    const Id = req.body.id;

    User.findOneAndUpdate({
        _id:  Id,
    },{
        $set:{
            Name: Name,
            Email: Email,
            Role: Role
        }
    }, null,(err)=>{
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        return res.send({
            success: true,
            message:'Good'
        })
    })
});

router.route('/delete').post((req,res)=>{
    const id = req.body.id

    User.findOneAndDelete({
        _id: id
    },null,(err)=>{
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        return res.send({
            success: true,
            message:'Good'
        })
    })
})
module.exports = router;