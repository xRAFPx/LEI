import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import { getFromStorage } from './Store/UserStore';

export default class SignUp extends Component{
  
  componentDidMount(){
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const { token } = obj;
      axios.get('http://localhost:5000/account/verify?token='+ token)
        .then(res => {
          if(res.data.success ){
            this.setState({
              token,
              isLoading: false,
            });
            window.location = '/'   
          } else {
            this.setState({
              isLoading: false,
            });
          }
        })
    }else{
      this.setState({
        isLoading: false,
      });
    }
  }
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Name: '',
      Email: '',
      Password: '',
      users: []
    }
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      Email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      Password: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      Name: this.state.Name,
      Email: this.state.Email,
      Password: this.state.Password
    }
    
    console.log(user)

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return(
    <div className="App">
      <h1>SignUp</h1>
      <div className="Content">
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label for="ClientName">Name</label>
                <input type="Name" required class="form-control" value={this.state.Name} onChange={this.onChangeName} id="ClientName" placeholder="Enter name"/>
            </div>
            <div className="form-group">
                <label for="ClientEmail">Email address</label>
                <input type="email" required value={this.state.Email} onChange={this.onChangeEmail} class="form-control" id="ClientEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" required value={this.state.pa} onChange={this.onChangePassword} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
     </div>
    </div>  
    )
  };
}
