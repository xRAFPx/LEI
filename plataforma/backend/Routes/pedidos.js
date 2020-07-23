const router = require('express').Router();
const Pedidos = require('../Models/userPedidos.model');
let user = require('../Models/user.model');
const User = require('../Models/user.model');
const { route } = require('./users');
const TipoDePedido = require('../Models/userTipoDePedido.model');
const Servico = require('../Models/userServiço.model');
const Prioridade = require('../Models/userPrioridade.model');
const NaturezaDePedido = require('../Models/userNaturazaDePedido.model')
const { default: Axios } = require('axios');

router.route('/clientpedidos/:id').get((req,res)=>{
    const userId = req.params.id
    Pedidos.find({
        User: userId
    },(err, pedidos)=>{
        if(err){
            return res.send({
                success: false
            })
        }
        return res.send(pedidos)
    })
})

router.route('/addPedidoUser').post((req,res)=>{
    const userId= req.body.Name;
    const pedidoId = req.body.pedidoId;

    User.find({
        Name: userId
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
                $set:{User: users[0].id}
            },(err,pedido)=>{
                if(err){
                    return res.send({
                        success: false,
                        message: "Error: Server Error"
                    })
                }
                else{
                    return res.send({
                        success: true,
                        message: "Good"
                    })
                }
            })
        }
    })
       
})

router.route('/filterPrioridade').get((req,res)=>{
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

router.route('/add').post((req,res)=>{
    const newPedido = new Pedidos()
    TipoDePedido.find({
        Name: req.body.TipoDePedido
    },(err,tipodepedidos)=>{
        if(err){
            res.send({
                success:false,
                message:"Error: Server Error"
            })
        }
        if(tipodepedidos.length != 1){
            res.send({
                success:false,
                message:"Error: tipo de pedido invalido"
            })
        }else{
             newPedido.TipoDePedido= tipodepedidos[0]._id
             Prioridade.find({
                 Name: req.body.Prioridade
             },(err,Prioridades)=>{
                 if(err){
                     res.send({
                         success:false,
                         message:"Error: Server Error"
                     })
                 }
                 if(Prioridades.length != 1){
                     res.send({
                         success:false,
                         message:"Error: prioridade invalido"
                     })
                 }else{
                     newPedido.Prioridade = Prioridades[0]._id
                     Servico.find({
                        Name: req.body.Servico
                     },(err,servicos)=>{
                        if(err){
                            res.send({
                                success:false,
                                message:"Error: Server Error"
                            })
                        }
                        if(servicos.length != 1){
                            res.send({
                                success:false,
                                message:"Error: tipo de servico invalido"
                            })
                        }else{
                            newPedido.Servico = servicos[0]._id
                            NaturezaDePedido.find({
                                Name: req.body.NaturezaDePedido
                            },(err,naturezadepedidos)=>{
                                if(err){
                                    res.send({
                                        success:false,
                                        message:"Error: Server Error"
                                    })
                                }
                                if(naturezadepedidos.length != 1){
                                    res.send({
                                        success:false,
                                        message:"Error: natureza de pedido invalido"
                                    })
                                }else{
                                    newPedido.NaturezaDePedido = naturezadepedidos[0]._id
                                    newPedido.Requisitante = req.body.Requisitante
                                    newPedido.Email = req.body.Email
                                    newPedido.Contacto = req.body.Contacto
                                    newPedido.Erro = req.body.Erro
                                    newPedido.Descricao = req.body.Descricao
                                    newPedido.save((err,pedido)=>{
                                             if(err){
                                                 return res.send({
                                                     success: false,
                                                     message:"Error: Server Erro"
                                                })
                                             }
                                             else{
                                                 return res.send({
                                                     pedido,
                                                     success: true,
                                                     message: "Good"
                                                 })
                                            }
                                    })
                                }
                            })
                        }
                    })
                 }
             })
        }
    })
})

router.route('/servico/:id').get((req,res)=>{
    const servicoId = req.params.id
    Servico.find({
        _id: servicoId
    },(err,servicos)=>{
        if(err){
            return res.send({
                success: false,
                message: "Error: Server error"
            })
        }
        if(servicos.length != 1){
            return res.send({
                success: false,
                message: "Error: invalid servico id"
            })
        }else{
            return res.send(servicos[0].Name)
        }
    })
})
module.exports = router;