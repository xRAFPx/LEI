import React, { Component } from 'react';
import './App.css';
import { getFromStorage } from './Store/UserStore';
import axios from 'axios';
import {Modal, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default class AdminPedidos extends Component{
  constructor(props){
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);

    this.state = {
      show : false,
      Name: "",
      userid : "",
      pedidos: [],
      pedidoid: "",
      users: []
    }

  }
  handleShow(pedido){
    this.setState({
      show: true,
      pedidoid: pedido._id
    })
  }
  handleClose(){
    this.setState({
      show: false
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
            axios.get('http://localhost:5000/pedidos/')
            .then(res =>{
              this.setState({
                pedidos: res.data
              })
            })
            axios.get('http://localhost:5000/users/userpedidos')
            .then(res =>{
              this.setState({
                  users: res.data,
                  Name: res.data[0].Name
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
  onChangeName(e){
    this.setState({
        Name:e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const send = {
        Name: this.state.Name,
        pedidoId: this.state.pedidoid
    }
    console.log(send)
    axios.post('http://localhost:5000/pedidos/addPedidoUser', send)
        .then(res =>{
            if(res.data.success){
                this.setState({
                    show: false
                })
                window.location.reload(false);
            }
        })
    
  }
  renderTableData(){
    return this.state.pedidos.map((pedido, index)=>{
          if(pedido.length!==0){
              let user = ""
              if(pedido.User===null){
                user = "None"
              }else{
                user = pedido.User.Name
              }
            return(
              <tr>
                <th scope="row">{index+1}</th>
                <th>{user}</th>
                <td>{pedido.Erro}</td>
                <td>{pedido.Servico.Name}</td>
                <td>{pedido.TipoDePedido.Name}</td>
                <td>{pedido.Prioridade.Name}</td>
                <td><button type="button" className="btn btn-warning" onClick={() =>this.handleShow(pedido)} style={{marginRight: 10 }}>Associar</button><button ype="button" className="btn btn-danger">Delete</button></td>
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
              <th scope="col">#</th>
              <th scope="col">User</th>
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
        <Modal.Header closeButton>
          <Modal.Title>Associar Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="Content">
            <Form onSubmit={this.onSubmit}>
                <Form.Group as={Row} controlId="formRequestType">
                    <Form.Label column sm="2">User:</Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" onChange={this.onChangeName}>
                            {this.state.users.map((user, key) => {
                                return <option key={key} value={user.Name} >{user.Name}</option>;
                            })}
                            </Form.Control>
                        </Col>
                 </Form.Group>
                <div className="Content">
                     <button style={{marginRight: 10}} onClick={this.handleClose} type="button" class="btn btn-secondary">Cancel</button>
                    <button type="submit" class="btn btn-primary">Associar</button>
                 </div>
            </Form>
        </div>
        </Modal.Body>
      </Modal>
      </div>
    );
  }
}
