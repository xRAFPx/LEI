import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
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
            document.getElementById("loginNav").style.display = "none";
            document.getElementById("logoutNav").style.display = "block";
          } else {
            this.setState({
              isLoading: false,
            });
            document.getElementById("logoutNav").style.display = "none";
          }
        })
    }else{
      this.setState({
        isLoading: false,
      });
      document.getElementById("loginNav").style.display = "block";
      document.getElementById("logoutNav").style.display = "none";
    }
  }
  render(){
  return (
    <nav className="Nav">
        <Link to="/">
        <img className="logo" alt="" src="https://media-exp1.licdn.com/dms/image/C4D0BAQE-rnsTh-ulCw/company-logo_200_200/0?e=2159024400&v=beta&t=KhMYMChYokF5RFiESFcGCoeXHPV6HpMrurSIMdK6yIo"></img>
        </Link>
        <ul className="nav-links">
            <Link style={{color: 'white'}} to='/Pedidos'>
            <li>Pedidos</li>
            </Link>
            <Link style={{color: 'white'}} to='/Historico'>
            <li>Historico</li>
            </Link>
            <Link id="loginNav" style={{color: 'white'}} to='/Login'>
            <li>Login/SignUp</li>
            </Link>
            <Link id="logoutNav" style={{color: 'white'}}>
            <li>Logout</li>
            </Link>
        </ul>
    </nav>
  );

  }
}
