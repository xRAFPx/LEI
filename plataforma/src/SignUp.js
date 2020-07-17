import React from 'react';
import './App.css';

function SignUp() {
  return (
    <div className="App">
      <h1>SignUp</h1>
      <div className="Content">
        <form>
            <div class="form-group">
                <label for="ClientName">Name</label>
                <input type="email" class="form-control" id="ClientName" placeholder="Enter name"/>
            </div>
            <div class="form-group">
                <label for="ClientEmail">Email address</label>
                <input type="email" class="form-control" id="ClientEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
     </div>
    </div>  
  );
}

export default SignUp;
