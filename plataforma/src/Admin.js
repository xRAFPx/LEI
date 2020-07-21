import React, { Component } from 'react';
import './App.css';
import { getFromStorage } from './Store/UserStore';
import axios from 'axios';
import {Modal} from 'react-bootstrap'

export default class Admin extends Component {
  constructor(props){
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleshowDelete = this.handleshowDelete.bind(this);
    this.deleteCliente = this.deleteCliente.bind(this);

    this.state = {
      id: '',
      Name: '',
      Email: '',
      Role: '',
      isLoading: true,
      token: '',
      users: [],
      show: false,
      showDelete: false,
    }
  }
  deleteCliente(){
    const user = {
       id: this.state.id
    }
      
    axios.post('http://localhost:5000/users/delete',user)
      .then(res =>{
        if(res.data.success){
          this.setState({
            showDelete: false
          })
          window.location.reload(false);
        }
      })
    
  }
  handleCloseDelete(){
    this.setState({
      showDelete: false
    })

  }
  handleshowDelete(user){
    this.setState({
      showDelete: true,
      id: user._id,
    });
  }
  handleClose(){
    this.setState({
      show: false
    })

  }
  handleShow(user){
    this.setState({
      show: true,
      id: user._id,
      Name: user.Name,
      Email: user.Email,
      Role: user.Role
    })
  }
  onChangeName(e) {
    this.setState({
      Name: e.target.value
    });
    console.log(this.state.Name);
  }
  onChangeEmail(e){
    this.setState({
      Email: e.target.value
    });
  }
  onChangeRole(e){
    this.setState({
      Role: e.target.value
    });
  }
  onSubmit(e){
    e.preventDefault();

    const user = {
      id: this.state.id,
      Name: this.state.Name,
      Email: this.state.Email,
      Role: this.state.Role,
    }
    axios.post('http://localhost:5000/users/update', user)
      .then(res =>{
        if(res.data.success){
          this.setState({
            show:false
          })
          window.location.reload(false);
        }
      })
  }
  componentDidMount(){
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const { token } = obj;
      axios.get('http://localhost:5000/account/verifyAdmin?token='+ token)
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
    axios.get('http://localhost:5000/users/')
      .then(res =>{
        this.setState({
          users: res.data
        })
      })
  }
  renderTableData(){
    let Role = "";
    return this.state.users.map((user, index)=> {
      if(user.Role===1){
        Role="User"
      }
      else{
        Role="Admin"
      }
      return(
        <tr>
          <th scope="row">{index+1}</th>
          <td>{user.Name}</td>
          <td>{user.Email}</td>
          <td>{Role}</td>
          <td><button type="button" className="btn btn-warning" onClick={() =>this.handleShow(user)} style={{marginRight: 10 }}>Editar</button><button onClick={() =>this.handleshowDelete(user)} type="button" className="btn btn-danger">Delete</button></td>
        </tr>
      )
    })
  }
  render(){
  return (
    <div className="App">
      <h1>Admin</h1>
      <div className="Table">
        <table className="table table-hover table-striped">
          <thead ro className="thead-dark">
            <tr>
              <th  scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Content">
            <form onSubmit={this.onSubmit}>
                <div class="form-group">
                    <label style={{marginRight: 10 }} for="ClientName">Name:</label>
                    <input onChange={this.onChangeName} value={this.state.Name} />
                </div>
                <div class="form-group">
                    <label style={{marginRight: 10 }} for="ClientEmail">Email address:</label>
                    <input required onChange={this.onChangeEmail} value={this.state.Email}/>
                </div>
                <div class="form-group">
                    <label style={{marginRight: 10 }} for="exampleInputPassword1">Role:</label>
                    <input onChange={this.onChangeRole} required value={this.state.Role} />
                </div>
                <div className="Content">
                <button style={{marginRight: 10}} onClick={this.handleClose} type="button" class="btn btn-secondary">Cancel</button>
                <button type="submit" class="btn btn-primary">Edit</button>
                </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={this.state.showDelete} onHide={this.handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Cliente?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Content">
              <button style={{marginRight: 10}} onClick={this.handleCloseDelete} type="button" class="btn btn-secondary">Cancel</button>
              <button onClick={this.deleteCliente} type="button" class="btn btn-danger">Delete</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
  }
}
