import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {

  const navStyle = {
    color: 'white'
  }

  return (
    <nav className="Nav">
        <Link to="/">
        <img className="logo" alt="" src="https://media-exp1.licdn.com/dms/image/C4D0BAQE-rnsTh-ulCw/company-logo_200_200/0?e=2159024400&v=beta&t=KhMYMChYokF5RFiESFcGCoeXHPV6HpMrurSIMdK6yIo"></img>
        </Link>
        <ul className="nav-links">
            <Link style={navStyle} to='/Pedidos'>
            <li>Pedidos</li>
            </Link>
            <Link style={navStyle} to='/Historico'>
            <li>Historico</li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;
