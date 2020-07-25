import React, {Component} from 'react';
import './App.css';
import Nav from './Nav';
import Admin from './Admin';
import Pedidos from './Pedidos';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Historico from './Historico';
import SignUp from './SignUp';
import Login from './Login';
import {getFromStorage} from './Store/UserStore';
import axios from 'axios';
import AdminPedidos from './AdminPedidos';

export default class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      token: '',
    }
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
              isLoading: false
            });
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
  render(){
  return (
    <Router>
      <div className="App">
        <div><Nav/></div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/adminpedidos" component={AdminPedidos}/>
          <Route path="/admin" exact component={Admin}/>
          <Route path="/pedidos" component={Pedidos}/>
          <Route path="/historico" component={Historico}/>
          <Route path="/signup" component={SignUp}/>
          <Route  path="/login" component={Login}/>
        </Switch>
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