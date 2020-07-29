import React from 'react';
import './Popup.css';
import Popup from "reactjs-popup";
import html2canvas from 'html2canvas';

class PopupComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        image:null
      };
      
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.getScreenshotHandler = this.getScreenshotHandler.bind(this);
      this.getNoScreenshotHandler = this.getNoScreenshotHandler.bind(this);
    }
    
    openModal() {
    this.setState({ open: true });
    }
    
    closeModal() {
    this.setState({ open: false });
    }
    
    getNoScreenshotHandler(){
      this.closeModal();
      this.setState({image:'//:0'})
      const screenshot = {
        screenshot: this.state.image
      }
      this.props.history.push({
          pathname: '/form',
          state: screenshot
        })
    }
    
    async getScreenshotHandler(){
      this.closeModal();
      const canvas = await html2canvas(document.body, {useCORS: true})
      this.setState({image: canvas.toDataURL()})
      const screenshot = {
        screenshot: this.state.image
      }
      this.props.history.push({
          pathname: '/form',
          state: screenshot
        })
    }
  
    render() {
      return (
        <div>
          <button className="requestButton btn" onClick={this.openModal}>
          Pedido de intervenção
          </button>
          <div data-html2canvas-ignore="true">
            <Popup
              open={this.state.open}
              closeOnDocumentClick
              onClose={this.closeModal}
            >
              <div className="modalS">
                  <span className="closeS" onClick={this.closeModal} title="Fechar">
                    &times;
                  </span>
                  <div className="popupHeader"> Screenshot do pedido de intervenção </div>
                  <div className="popupContent">
                    {" "}
                    No caso do seu erro se encontrar no ecrã, selecione a opção "Sim" e poderá fazer um screenshot ao ecrã. Será posteriormente reencaminhado para o formulário para melhor identificação do erro. 
                    <br />
                    Senão clique na opção "Não" e será reencaminhado para o formulário onde poderá explicar o erro que encontra.
                  </div>
                  <div className="actions">  
                      <button className="popupButton" onClick={this.getScreenshotHandler}>
                          Sim
                      </button>
                      <button className="popupButton" onClick={this.getNoScreenshotHandler}>
                          Não
                      </button>
                  </div>
              </div>
            </Popup>
          </div>
        </div>
      );
    }
  }
  
export default PopupComponent;