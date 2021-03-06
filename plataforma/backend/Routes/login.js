const router = require('express').Router();
let userSession = require('../Models/userSession.model');
const UserSession = require('../Models/userSession.model');
let user = require('../Models/user.model');
const User = require('../Models/user.model');

router.route('/login/:email').post((req,res)=>{
    User.find({Email: req.params.email},(err, users) =>{
        if(err){
            return res.send({
                success: false,
                message: 'Error'
            });
        }
        if(users.length !=1){
            return res.send({
                success: false,
                message: 'Error'
            });
        }

         const user = users[0];

         const userSession = new UserSession();
         userSession.userId = user._id;
         userSession.save((err, doc)=> {
             if(err){
                 return res.send({
                     success: false,
                     message: 'Error: server error'
                 });
             }
             return res.send({
                 success: true,
                 token: doc._id
             })

         })
    });
});

router.route('/verify').get((req,res)=>{
    const {query} = req;
    const {token} = query;
    UserSession.find({
        _id: token,
    }, (err, sessios)=>{
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }

        if(sessios.length != 1){
         
            return res.send({

                success: false,
                message: 'Error: invalid'
            });

        }else{
            const userId = sessios[0].userId
            return res.send({
                userId,
                success: true,
                message: 'Good'
            });
        }
    });

});

router.route('/logout').get((req,res)=>{
    const {query} = req;
    const {token} = query;
    
    UserSession.findOneAndUpdate({
        _id: token,
    },{
        $set:{isDeleted:true}
    },null,(err,sessions) =>{
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

router.route('/verifyAdmin').get((req,res)=>{
    const {query} = req;
    const {token} = query;
    UserSession.find({
        _id: token,
    }, (err, sessios)=>{
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }

        if(sessios.length != 1){
            return res.send({
                success: false,
                message: 'Error: invalid'
            });

        }else{
            User.find({
                _id: sessios[0].userId,
            },(err,users) =>{
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    })
                }
                if(users.length != 1){
                    return res.send({
                        users: sessios[0].userId,
                        success: false,
                        message: 'Error: users error'
                    });
                }else{
                    if(users[0].Role==2){
                        res.send({
                            success: true,
                            message: 'good'
                        })
                    }else{
                        res.send({
                            success: false,
                            message: 'Not admin'
                        })
                    }
                }
            })
        }
    });

});

module.exports = router;