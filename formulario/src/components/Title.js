import React from 'react';
import './Title.css';
import headerImage from "../data/chp.png";

function Title() {
  return (
    <div className="title">
      <div className="top-left">
        <img className='headerImage' src={headerImage} alt="Centro Hospital do Porto"/>
      </div>
      <div className="top-center">
        <h2>Pedidos de Intervenção</h2>
      </div>
    </div>
  )
}

export default Title;