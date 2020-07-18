import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import  { Link } from 'react-router-dom';


export default class Login extends Component{
  constructor(props){
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Email: '',
      Password: ''
    }

    
  }
  onChangeEmail(e) {
    this.setState({
      Email: e.target.value
    });
    document.getElementById("warning").style.display = "none";
  }
  onChangePassword(e) {
    this.setState({
      Password: e.target.value
    });
    document.getElementById("warning").style.display = "none";
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      Email: this.state.Email,
      Password: this.state.Password
    }

    console.log(user)

    axios.get('http://localhost:5000/users/findUser/'+ user.Email+'/'+user.Password)
      .then(res => {
          if(res.data.length > 0){
            window.location = '/';
          }
          else{
            document.getElementById("warning").style.display = "block";
          }
      })
      .catch((error)=>{
        console.log(error)
      })

  }


  render(){
  return (
    <div className="App">
      <h1>Login</h1>
      <div style={{display: 'none'}} id="warning" className="warning">
          <label>Password ou email incorreto tente novamente.</label>
      </div>
      <div className="Content">
        <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="ClientEmail">Email address</label>
                <input type="email" required value={this.state.Email} onChange={this.onChangeEmail} class="form-control" id="ClientEmail" placeholder="Enter email"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" required value={this.state.Password} onChange={this.onChangePassword} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <Link to="/signup" style={{marginRight: 10 }} type="button" class="btn btn-secondary">SignUp</Link>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
     </div>
    </div>
  );
  }
}
