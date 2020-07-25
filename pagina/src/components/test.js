import React from 'react';
import '../App.css';
import Popup from "reactjs-popup";
import {snipper} from './Snipper.js';

function App() {

  const popupFunct = () => (
    <Popup trigger={<button className="requestButton">Pedido de intervenção</button>} modal>
      {close => (
        <div className="modal">
          <a className="close" onClick={close} title="Fechar" >&times;</a>
          <div className="header"> Screenshot do pedido de intervenção </div>
          <div className="content">
            {" "}
            No caso do seu erro se encontrar no ecrã, selecione a opção "Sim" e poderá fazer um screenshot ao ecrã. Será posteriormente reencaminhado para o formulário para melhor identificação do erro. 
            <br />
            Senão clique na opção "Ignorar" e será reencaminhado para o formulário onde poderá explicar o erro que encontra.
          </div>
          <div className="actions">
            
            <button className="popupButton"
              onClick={() => {
                //vai para a página do formulario
                //imagem é screenshot
                snipper()
                close()
                console.log("screenshot");
              }}
            >
              Sim
            </button>
            <button className="popupButton" onClick={() => {
                //vai para a página do formulario
                //imagem é nula
                console.log("no screenshot");
                close();
              }}
            >
              Ignorar
            </button>
          </div>
        </div>
      )}
    </Popup>
  );

      return( 
      <div id="body">
        <h1>Print me</h1>
        <div data-html2canvas-ignore="true">
          popupFunct()
        </div>
      </div>
    );
    
  }



export default App;
