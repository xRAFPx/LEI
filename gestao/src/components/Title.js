import React from 'react';
import '../App.css';
import headerImage from "../data/chp.png";

function Title() {
  return (
    <div className="Title">
      <div class="top-left">
        <img class='headerImage' src={headerImage} alt="Centro Hospital do Porto"/>
      </div>
      <div class="top-center">
        <h2>Pedidos de Intervenção</h2>
      </div>
    </div>
  )
}

export default Title;