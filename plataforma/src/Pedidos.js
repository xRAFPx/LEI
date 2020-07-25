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
      Descricao: "",
      Erro: "",
      Requisitanta: "",
      userid : "",
      pedidos: [[]]
    }

  }
  handleShow(pedido){
    this.setState({
      show: true,
      Erro: pedido.Erro,
      Requisitante: pedido.Requisitante,
      Descricao: pedido.Descricao
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
  componentWillMount(){
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
            axios.get('http://localhost:5000/pedidos/clientpedidos/'+ res.data.userId)
            .then(res =>{
              this.setState({
                pedidos: res.data
              })
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
    return this.state.pedidos.map((pedido, index)=>{
          if(pedido.length!==0){
            return(
              <tr>
                <th><input type="checkbox"></input></th>
                <th scope="row">{index+1}</th>
                <td>{pedido.Erro}</td>
                <td>{pedido.Servico.Name}</td>
                <td>{pedido.TipoDePedido.Name}</td>
                <td>{pedido.Prioridade.Name}</td>
                <td><button type="button" className="btn btn-warning" onClick={() =>this.handleShow(pedido)} style={{marginRight: 10 }}>Mais Info</button></td>
              </tr>
            )
          }
          return(null)
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
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton={this.handleClose}>
          <Modal.Title>Mais info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="Content">
            <form>
                <div class="form-group">
                    <label style={{marginRight: 10 }}>Erro:</label>
                    <input readOnly={true} value={this.state.Erro} />
                </div>
                <div class="form-group">
                    <label style={{marginRight: 10 }}>Descrição:</label>
                    <input readOnly={true} value={this.state.Descricao}/>
                </div>
                <div class="form-group">
                    <label style={{marginRight: 10 }}>Requisitante:</label>
                    <input readOnly={true} value={this.state.Requisitante} />
                </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    );
  }
}
