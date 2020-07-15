import React from 'react';
import './App.css';
import  { Link } from 'react-router-dom';


function Login() {

  return (
    <div className="App">
      <h1>Login</h1>
      <div className="Content">
        <form>
            <div class="form-group">
                <label for="ClientEmail">Email address</label>
                <input type="email" class="form-control" id="ClientEmail" placeholder="Enter email"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <Link to="/signup" style={{marginRight: 10 }} type="button" class="btn btn-secondary">SignUp</Link>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
     </div>
    </div>
  );
}

export default Login;
