import React, { Component } from 'react';
import './App.css';
import { getFromStorage } from './Store/UserStore';
import axios from 'axios';
import {Modal, Alert} from 'react-bootstrap';

export default class Pedidos extends Component{
  constructor(props){
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.onExecute = this.onExecute.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.prepareTable = this.prepareTable.bind(this);

    this.state = {
      show : false,   
      AlertShow: false,
      Descricao: "",
      Erro: "",
      Requisitanta: "",
      userid : "",
      Contacto: "",
      Email: "",
      TipoDePedido: "",
      Message: "",
      MessageSuccess: false,
      MessageState: "success",
      pedidos: [],
      pedidosChecked: []
    }
  }
  onChecked(e){
      if(e.target.checked){
        this.setState({
          pedidosChecked: this.state.pedidosChecked.concat(e.target.value)
        })
      }
      else{
        var array = [...this.state.pedidosChecked];
        var index = array.indexOf(e.target.value)
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({pedidosChecked: array});
        }
      }
  }
  handleShow(pedido){
    this.setState({
      show: true,
      Erro: pedido.Erro,
      Requisitante: pedido.Requisitante,
      Descricao: pedido.Descricao,
      Contacto: pedido.Contacto,
      Email: pedido.Email,
      TipoDePedido: pedido.TipoDePedido.Name
    })
  }
  handleCloseAlert(){
    this.setState({
      AlertShow: false
    })
  }
  handleClose(){
    this.setState({
      show: false
    })
  }
  prepareTable(){
    axios.get('http://localhost:5000/pedidos/clientpedidos/'+ this.state.userid)
            .then(res =>{
              this.setState({
                pedidos: res.data,
                pedidosChecked: []
              })
            })
  }
  async onExecute(){
    if(this.state.pedidosChecked.length===0){
      this.setState({
        AlertShow: true,
        Message: "Erro nenhum pedido selecionado.",
        MessageState: "danger"
      })
    }
    else{
      for (let index = 0; index < this.state.pedidosChecked.length; index++) {
        const pedidoid = {
           id: this.state.pedidosChecked[index]
        }
        await axios.post(' http://localhost:5000/pedidos/executar', pedidoid)
        .then(res=>{
          if(res.data.success){
            this.setState({
              MessageSuccess: true
            })
          }
          else{
            this.setState({
              MessageSuccess: false
            })
          }
        })
      }
      if(this.state.MessageSuccess){
        this.setState({
          AlertShow: true,
          Message: "Pedidos executados com sucesso",
          MessageState: "success"
        })
        this.prepareTable()
      }
      else{
        this.setState({
          AlertShow: true,
          Message: "Erro ao executar pedido",
          MessageState: "danger"
        })
      }
    }
  }
  async componentWillMount(){
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const { token } = obj;
     await axios.get('http://localhost:5000/account/verify?token='+ token)
        .then(res => {
          if(res.data.success){
            this.setState({
              token,
              isLoading: false,
              userid: res.data.userId
            });
             this.prepareTable();
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
                <th><input type="checkbox" value={pedido._id} onChange={this.onChecked}></input></th>
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
        <div>
          <button type="button" className="btn btn-success" onClick={this.onExecute}>Executar</button>
        </div>
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
                    <div><label style={{marginRight: 10 }}>Descrição:</label></div>
                    <textarea rows={5} style={{width: 300}} readOnly={true} value={this.state.Descricao}/>
                </div>
                <div class="form-group">
                    <label style={{marginRight: 10 }}>Requisitante:</label>
                    <input readOnly={true} value={this.state.Requisitante} />
                </div>
                <div class="form-group">
                    <label style={{marginRight: 10 }}>Contacto:</label>
                    <input readOnly={true} value={this.state.Contacto} />
                </div>
                <div class="form-group">
                    <label style={{marginRight: 10 }}>Email:</label>
                    <input readOnly={true} value={this.state.Email} />
                </div>
                <div class="form-group">
                    <label style={{marginRight: 10 }}>Tipo de pedido:</label>
                    <input readOnly={true} value={this.state.TipoDePedido} />
                </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={this.state.AlertShow} onHide={this.handleCloseAlert}>
        <Modal.Body>
          <Alert variant={this.state.MessageState}>
           <p>
              {this.state.Message}
           </p>
          </Alert>
        </Modal.Body>
      </Modal>
      </div>
    );
  }
}
