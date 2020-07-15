import React from 'react';
import './App.css';
import Nav from './Nav';
import Admin from './Admin';
import Pedidos from './Pedidos';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Historico from './Historico';
import SignUp from './SignUp';
import Login from './Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/pedidos" component={Pedidos}/>
          <Route path="/historico" component={Historico}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

const Home= () => (
  <div>
    <h1>Home Page</h1>
  </div>
)
export default App;
