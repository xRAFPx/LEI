import React from 'react';
import './Navbar.css';
import PopupComponent from './Popup';

class NavbarComponent extends React.Component{
  render(){
      return(
      <nav className='navbar navbar-expand-sm'>
        <span className='navbar-text mb-0 h1'>Centro Hospitalar do Porto</span>
        <div className='right'>
            <PopupComponent history={this.props.history}/>
        </div>
    </nav>)
  }
}

export default NavbarComponent;