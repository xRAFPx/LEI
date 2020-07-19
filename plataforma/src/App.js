import React, {Component} from 'react';
import './App.css';
import Nav from './Nav';
import Admin from './Admin';
import Pedidos from './Pedidos';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Historico from './Historico';
import SignUp from './SignUp';
import Login from './Login';
import NavAdmin from './navAdmin';

export default class App extends Component{
  onSubmit(e){
    e.preventDefault();
    document.getElementById("NormalNav").style.display = "none";
    document.getElementById("AdminNav").style.display = "block";
  }


  render(){
  return (
    <Router>
      <div className="App">
        <div id="NormalNav"><Nav/></div>
        <div style={{display: 'none'}} id="AdminNav"><NavAdmin/></div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/pedidos" component={Pedidos}/>
          <Route path="/historico" component={Historico}/>
          <Route path="/signup" component={SignUp}/>
          <Route  path="/login" component={Login}/>
        </Switch>
        <form onSubmit={this.onSubmit}>
          <button type="submit">Teste</button>
        </form>
      </div>
    </Router>
  );
  }
}

const Home= () => (
  <div>
    <h1>Home Page</h1>
  </div>
)