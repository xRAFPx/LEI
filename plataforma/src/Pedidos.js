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

    this.state = {
      show : false
    }

  }
  handleShow(){
    this.setState({
      show: true
    })
  }
  handleClose(){
    this.setState({
      show: false
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
            });
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
  render(){
    return (
      <div className="App">
        <h1>Pedidos</h1>
        <div className="Table">
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Serviço</th>
              <th scope="col">Tipo de Pedido</th>
              <th scope="col">Prioridade</th>
            </tr>
          </thead>
          <tbody>
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
