import React from 'react';
import Form from 'react-bootstrap/Form';
import './App.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import requestService from "./data/service.json";
import requestType from "./data/requestType.json";
import requestNature from "./data/requestNature.json";
import requestPriority from "./data/requestPriority.json";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Media from 'react-bootstrap/Media';
import Title from './components/Title';
import screenshot from './data/chp.png';

class FormPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reqType:requestType[0].Value,
      reqNature:requestNature[0].Value,
      reqService:requestService[0].Value,
      requester:'Administrador de Sistemas (288)',
      requesterEmail:'something@email.com',
      requesterNum:'123456789',
      reqDescription:'',
      reqScreenshot: "//:0",
      reqPriority: requestPriority[1].Value
    };

    this.loadPicture = this.loadPicture.bind(this);
    this.closePicture = this.closePicture.bind(this);
    this.fileInput = React.createRef();
    this.handleRequestTypeChange = this.handleRequestTypeChange.bind(this);
    this.handleRequestNatChange = this.handleRequestNatChange.bind(this);
    this.handleRequestServChange = this.handleRequestServChange.bind(this);
    this.handleRequestDescChange = this.handleRequestDescChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
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

  handleRequestTypeChange(event){
    this.setState({reqType:event.target.value});
  }

  handleRequestNatChange(event){
    this.setState({reqNature:event.target.value});
  }

  handleRequestServChange(event){
    this.setState({reqService:event.target.value});
  }

  handleRequestDescChange(event){
    this.setState({reqDescription:event.target.value});
  }

  handlePriorityChange(event){
    this.setState({reqPriority:event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
    //SEND TO EMAIL
    // var mailTo = '';
    // var mailFrom = this.state.requesterEmail;

    // window.location = '/';
    this.props.history.push('/')
  }

  // componentDidMount() {
  //   axios.get('http://localhost:3000/form')
  //     .then(res => {
  //       const screenshot = res.data;
  //       this.setState({ reqScreenshot:screenshot });
  //     })
  // }

  render(){
    return (
    <div>
      <div id = "myModal" className = "modal">
        <span className="close" onClick={this.closePicture}>&times;</span>
        <img className="modal-content" id="img" alt='open'/>
      </div>
      <div className="App">
        <Title/>
        <h5>Novo Pedido</h5>
      </div>
      <div className='container'>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formRequestType">
              <Form.Label column sm="2">Tipo de pedido: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" as="select" value={this.state.reqType} onChange={this.handleRequestTypeChange} htmlSize={5} custom>
                {requestType.map((e, key) => {
                return <option key={key} value={e.Value}>{e.Value}</option>;
                  })}
              </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequestNature">
              <Form.Label column sm="2">Natureza do pedido: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" as="select" value={this.state.reqNature} onChange={this.handleRequestNatChange} htmlSize={5} custom>
                  {requestNature.map((e, key) => {
                  return <option key={key} value={e.Value}>{e.Value}</option>;
                    })}
              </Form.Control>
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formService">
              <Form.Label column sm="2">Serviço: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" as="select" value={this.state.reqService} onChange={this.handleRequestServChange} htmlSize={5} custom>
                {requestService.map((e, key) => {
                return <option key={key} value={e.Value}>{e.Value}</option>;
                  })}
              </Form.Control>
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formRequester">
              <Form.Label column sm="2">Requisitante: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" plaintext readOnly value={this.state.requester}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequesterEmail">
              <Form.Label column sm="2">Email: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" plaintext readOnly value={this.state.requesterEmail} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequesterContact">
              <Form.Label column sm="2">Contacto: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" plaintext readOnly value={this.state.requesterNum} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDescription">
              <Form.Label column sm="2">Descrição: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" as="textarea" rows="5" value={this.state.requestPriority} onChange={this.handlePriorityChange} required/>
                <Form.Control.Feedback type="invalid">
                  Por favor indique uma descrição do seu pedido.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formScreenshot">
              <Form.Label column sm="2">Captura automática de ecrã: </Form.Label>
              <Col sm="10">
                <Media as="li">
                  <img id ='image' onClick={this.loadPicture} width={64} height={64} className="mr-3" src={this.state.reqScreenshot} alt="Screenshot" />
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
                <Form.Control size="sm" as="select" value={this.state.reqPriority} onChange={this.handlePriorityChange}>
                  {requestPriority.map((e, key) => {
                  return <option key={key} value={e.Value}>{e.Value}</option>;
                    })}
                </Form.Control>
              </Col>
            </Form.Group>
            <div className='containerButton'>
              <button className = 'requestButton' variant="primary" type="submit">Confirmar</button>
              <button className = 'requestButton' type="button" value="cancel">Cancelar</button>
            </div>
            
          </Form>
      </div>
    </div>   
  );
  }
}

export default FormPage;
