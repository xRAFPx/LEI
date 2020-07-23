const router = require('express').Router();
let pedidos = require('../Models/userPedidos.model')
const Pedidos = require('../Models/userPedidos.model');
let user = require('../Models/user.model');
const User = require('../Models/user.model');
const { route } = require('./users');

router.route('/').get((req,res)=>{
    const userId = req.body.userId
    Pedidos.find({
        userId: userId
    })
         .then(pedidos => res.json(pedidos))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/addPedidoUser').post((req,res)=>{
    const userId= req.body.userId;
    const pedidoId = req.body.pedidoId;

    User.find({
        _id: userId
    },(err,users)=>{
        if(err){
            return res.send({
                success: false,
                message: "Error: Server error"
            })
        }
        if(users.length != 1){
            return res.send({
                success: false,
                message: "Error: Invalid user"
            })
        }else{
            Pedidos.findOneAndUpdate({
                _id: pedidoId
            },{
                $set:{userId: users[0].id}
            },(err,pedido)=>{
                if(err){
                    return res.send({
                        success: false,
                        message: "Error: Server Error"
                    })
                }
                if(pedido.length != 1){
                    return res.send({
                        success: false,
                        message: "Error: Invalid"
                    })
                }else{
                    return res.send({
                        success: true,
                        message: "Good"
                    })
                }
            })
        }
    })
       
})

router.route('/prioridade').get((req,res)=>{
    const prioridade = req.body.prioridade
    Pedidos.find({
        prioridade:prioridade
    },(err,pedidos)=>{
        if(err){
            return res.send({
                success: false,
                message: "Error: Server error"
            })
        }
        else{
            return res.json(pedidos)
        }
    })
})

module.exports = router;