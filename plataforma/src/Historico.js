import React, {Component} from 'react';
import './App.css';
import { getFromStorage } from './Store/UserStore';
import axios from 'axios';

export default class Nav extends Component{
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
            window.location.href = '/login';
          }
        })
    }else{
      this.setState({
        isLoading: false,
      });
      window.location('/login');
    }
  }
  render(){
  return (
      <div className="App">
        <h1>Historico</h1>
      </div>
    );
  }
}
