import React, { Component } from 'react';
import './App.css';
import { getFromStorage } from './Store/UserStore';
import axios from 'axios';
import {Modal} from 'react-bootstrap';

export default class Pedidos extends Component{
  constructor(props){
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.getServico = this.getServico.bind(this);

    this.state = {
      show : false,
      prioridade: "",
      tipoDePedido: "",
      servico: "",
      erro: "",
      userid : "",
      pedidos: []
    }

  }
  handleShow(pedido){
    console.log(this.state.userid)
    this.setState({
      show: true
    })
  }
  handleClose(){
    this.setState({
      show: false
    })
  }
  getServico(pedido){
    axios.get(' http://localhost:5000/pedidos/servico/'+pedido.Servico)
        .then(res=>{
          return (res.data)
        })
  }
  componentDidMount(){
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const { token } = obj;
      axios.get('http://localhost:5000/account/verify?token='+ token)
        .then(res => {
          if(res.data.success){
            this.setState({
              token,
              isLoading: false,
              userid: res.data.userId
            });
            axios.get('http://localhost:5000/pedidos/clientpedidos/' + res.data.userId)
              .then(res =>{
                this.setState({
                 pedidos: res.data
              })  
              console.log(res.data)
           })
          } else {
            this.setState({
              isLoading: false,
            });
            window.location = '/login'
          }
        })
    }else{
      this.setState({
        isLoading: false,
      });
      window.location = '/login'
    }
    
    
  }
  renderTableData(){
    return this.state.pedidos.map((pedido, index)=> {
        return(
          <tr>
            <th><input type="checkbox"></input></th>
            <th scope="row">{index+1}</th>
            <td>{pedido.Erro}</td>
            <td>{this.getServico(pedido)}</td>
            <td>{pedido.TipoDePedido}</td>
            <td>{pedido.Prioridade}</td>
            <td><button type="button" className="btn btn-warning" onClick={() =>this.handleShow(pedido)} style={{marginRight: 10 }}>Mais Info</button></td>
          </tr>
        )
    })
  }
  render(){
    return (
      <div className="App">
        <h1>Pedidos</h1>
        <div className="Table">
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">#</th>
              <th scope="col">Erro</th>
              <th scope="col">Serviço</th>
              <th scope="col">Tipo de Pedido</th>
              <th scope="col">Prioridade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
      <button variant="primary" onClick={this.handleShow}>
        Launch demo modal
      </button>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
      </div>
    );
  }
}
