import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { getFromStorage , setInStorage} from './Store/UserStore';
import axios from 'axios';


export default class Nav extends Component{
  constructor(props){
    super(props);

    this.onlogout= this.onlogout.bind(this);
  }

  onlogout(){
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const { token } = obj;
      axios.get('http://localhost:5000/account/logout?token='+ token)
        .then(res => {
          if(res.data.success){
            setInStorage('the_main_app', { token: ''});
              this.setState({
                 token: '',
                 isLoading:false,
            })
            window.location = '/'
            document.getElementById("loginNav").style.display = "block";
            document.getElementById("logoutNav").style.display = "none";
            document.getElementById("AdminNav").style.display = "none";
          } else {
            this.setState({
              isLoading: false,
            });
            document.getElementById("AdminNav").style.display = "none";
            document.getElementById("logoutNav").style.display = "none";
          }
        })
    }else{
      this.setState({
        isLoading: false,
      });
      document.getElementById("loginNav").style.display = "none";
      document.getElementById("logoutNav").style.display = "block";
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
              isLoading: false,
            });
            axios.get('http://localhost:5000/account/verifyAdmin?token='+ token)
              .then(res=>{
                if(res.data.success){
                  document.getElementById("AdminNav").style.display = "block";
                }else{
                  document.getElementById("AdminNav").style.display = "none";
                }
              });
            document.getElementById("loginNav").style.display = "none";
            document.getElementById("logoutNav").style.display = "block";
          } else {
            this.setState({
              isLoading: false,
            });
            document.getElementById("AdminNav").style.display = "none";
            document.getElementById("logoutNav").style.display = "none";
          }
        })
    }else{
      this.setState({
        isLoading: false,
      });
      document.getElementById("AdminNav").style.display = "none";
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
            <Link id="AdminNav" style={{color: 'white'}} to='/admin'>
            <li>Clientes</li>
            </Link>
            <Link style={{color: 'white'}} to='/Pedidos'>
            <li>Pedidos</li>
            </Link>
            <Link style={{color: 'white'}} to='/Historico'>
            <li>Historico</li>
            </Link>
            <Link id="loginNav" style={{color: 'white'}} to='/Login'>
            <li>Login/SignUp</li>
            </Link>
            <Link onClick={this.onlogout} id="logoutNav" style={{color: 'white'}}>
            <li>Logout</li>
            </Link>
        </ul>
    </nav>
  );

  }
}
