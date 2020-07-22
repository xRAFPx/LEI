import React from 'react';
import Form from 'react-bootstrap/Form';
import './App.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Service from "./data/service.json";
import requestType from "./data/requestType.json";
import requestNature from "./data/requestNature.json";
import requestPriority from "./data/requestPriority.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import Media from 'react-bootstrap/Media';
import Title from './components/Title';
import screenshot from './Screenshot.jpg';


class FormPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: null
    };
    this.loadPicture = this.loadPicture.bind(this);
    this.closePicture = this.closePicture.bind(this);
  }

  ficheiros() {
    console.log(document.getElementById("exampleFormControlFile1").file);
  }

  loadPicture() {
    document.getElementById("myModal").style.display = 'block';
    document.getElementById("img").src = screenshot;
  }

  closePicture() {
    document.getElementById("myModal").style.display = 'none';
  }

  render(){
    return (
    <div>
      <div id = "myModal" className = "modal">
        <span className="close" onClick={this.closePicture}>&times;</span>
        <img className="modal-content" id="img" alt='open'/>
      </div>
      <div className="App">
        <Title/>
        <p>Novo Pedido</p>
      </div>
      <div className='container'>
        <Form>
            <Form.Group as={Row} controlId="formRequestType">
              <Form.Label column sm="2">Tipo de pedido: </Form.Label>
              <Col sm="10">
                <Form.Control as="select" defaultValue={requestType[0].Value} htmlSize={5} custom>
                {requestType.map((e, key) => {
                return <option key={key} value={e.Key}>{e.Value}</option>;
                  })}
              </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequestNature">
              <Form.Label column sm="2">Natureza do pedido: </Form.Label>
              <Col sm="10">
                <Form.Control as="select" defaultValue={requestNature[0].Value} htmlSize={5} custom>
                  {requestNature.map((e, key) => {
                  return <option key={key} value={e.Key}>{e.Value}</option>;
                    })}
              </Form.Control>
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formService">
              <Form.Label column sm="2">Serviço: </Form.Label>
              <Col sm="10">
                <Form.Control as="select" defaultValue={Service[0].Value} htmlSize={5} custom>
                {Service.map((e, key) => {
                return <option key={key} value={e.Key}>{e.Value}</option>;
                  })}
              </Form.Control>
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formRequester">
              <Form.Label column sm="2">Requisitante: </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={requestPriority[1].Value} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequesterEmail">
              <Form.Label column sm="2">Email: </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={requestPriority[1].Value} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequesterContact">
              <Form.Label column sm="2">Contacto: </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={requestPriority[1].Value} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDescription">
              <Form.Label column sm="2">Descrição: </Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" rows="5" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formScreenshot">
              <Form.Label column sm="2">Captura automática de ecrã: </Form.Label>
              <Col sm="10">
                <Media as="li">
                  <img id ='image' onClick={this.loadPicture} width={64} height={64} className="mr-3" src="http://placehold.it/64x64" alt="Screenshot" />
                </Media>
              </Col>
            </Form.Group>
                            
            <Form.Group as={Row} controlId="formAttachments">
              <Form.Label column sm="2">Anexos: </Form.Label>
              <Col sm="10">
                <Form.File id="exampleFormControlFile1" onChange={this.ficheiros}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequestPriority">
              <Form.Label column sm="2">Prioridade: </Form.Label>
              <Col sm="10">
                <Form.Control as="select" defaultValue={requestPriority[1].Value}>
                  {requestPriority.map((e, key) => {
                  return <option key={key} value={e.Key}>{e.Value}</option>;
                    })}
                </Form.Control>
              </Col>
            </Form.Group>

            <button className = 'requestButton' variant="primary" type="submit">Confirmar</button>
            {/* <Link
            to={{
              pathname: "/",
              state: props.location.state
            }}
          > */}
            <button className = 'requestButton' type="button" value="cancel">Cancelar</button>
            {/* </Link> */}
          </Form>
      </div>
    </div>   
  );
  }

}

export default FormPage;
