import React from 'react';
import Form from 'react-bootstrap/Form';
import './Form.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import requestService from "../data/service.json";
import requestType from "../data/requestType.json";
import requestNature from "../data/requestNature.json";
import requestPriority from "../data/requestPriority.json";
import Title from './Title';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      reqError:'',
      reqScreenshot:"//:0",
      showScreenshot:false,
      reqPriority:requestPriority[1].Value,
      reqFiles:[]
    };

    this.loadPicture = this.loadPicture.bind(this);
    this.closePicture = this.closePicture.bind(this);
    this.handleRequestTypeChange = this.handleRequestTypeChange.bind(this);
    this.handleRequestNatChange = this.handleRequestNatChange.bind(this);
    this.handleRequestServChange = this.handleRequestServChange.bind(this);
    this.handleRequestErrorChange = this.handleRequestErrorChange.bind(this);
    this.handleRequestDescChange = this.handleRequestDescChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.readUploadedFileAsText = this.readUploadedFileAsText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  loadPicture() {
    document.getElementById("myModal").style.display = 'block';
    var srcImg = document.getElementById("image").src;
    document.getElementById("img").src = srcImg;
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

  handleRequestErrorChange(event){
    this.setState({reqError:event.target.value});
  }

  handleRequestDescChange(event){
    this.setState({reqDescription:event.target.value});
  }

  handlePriorityChange(event){
    this.setState({reqPriority:event.target.value});
  }

  readUploadedFileAsText(inputFile){
    const temporaryFileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsBinaryString(inputFile);
    });
  };

  handleClick(event){
    event.preventDefault();
    var filesList = [];
    Array.from(event.target.files).forEach(async f => {
        filesList.push({ filename: f.name, contentType: f.type, encoding: 'binary', content: await this.readUploadedFileAsText(f)})
    });

    this.setState({reqFiles:filesList})      
  }

  async handleSubmit(event) {
    event.preventDefault();
    let image = null;
    if (this.state.reqScreenshot != null)
    {
      image = { filename: "Screenshot.png", path:this.state.reqScreenshot};
    }
    await axios({
      method: "POST", 
      url:"http://localhost:5001/form/send", 
      data: {
        tipoPedido: this.state.reqType,   
        naturezaPedido: this.state.reqNature,  
        servico: this.state.reqService,
        requesitante: this.state.requester,
        email: this.state.requesterEmail,
        contacto: this.state.requesterNum,
        descricao: this.state.reqDescription,
        prioridade: this.state.reqPriority,
        imagem: image,
        ficheiros: this.state.reqFiles,
        erro: this.state.reqError
      }})
      .then((response)=>{
      if (response.data.message === 'success'){
        axios.post('http://localhost:5000/api/receiveEmail')
        console.log(this.state.reqFiles)
          alert('Pedido de Intervenção enviado'); 
          window.history.back();
      }else if(response.data.message === 'fail'){
          alert("'Pedido de Intervenção falhou no envio'")
      }
    })
  }

  handleCancel(){
    window.history.back();
  }

  componentDidMount() {
    this.setState({reqScreenshot: this.props.location.state.screenshot});
    this.setState({showScreenshot: this.props.location.state.showScreenshot})
  }

  render( ){

    return (
      <div>
          <div id = "myModal" className = "modal">
            <span className="closeB" onClick={this.closePicture}>&times;</span>
            <img className="modalContent" id="img" alt='open'/>
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
                <Form.Control size="sm" as="select" value={this.state.reqType} onChange={this.handleRequestTypeChange}>
                {requestType.map((e, key) => {
                return <option key={key} value={e.Value}>{e.Value}</option>;
                  })}
              </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequestNature">
              <Form.Label column sm="2">Natureza do pedido: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" as="select" value={this.state.reqNature} onChange={this.handleRequestNatChange}>
                  {requestNature.map((e, key) => {
                  return <option key={key} value={e.Value}>{e.Value}</option>;
                    })}
              </Form.Control>
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formService">
              <Form.Label column sm="2">Serviço: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" as="select" value={this.state.reqService} onChange={this.handleRequestServChange}>
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

            <Form.Group as={Row} controlId="formError">
              <Form.Label column sm="2">Assunto: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" as="textarea" value={this.state.reqError} onChange={this.handleRequestErrorChange}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDescription">
              <Form.Label column sm="2">Descrição: </Form.Label>
              <Col sm="10">
                <Form.Control size="sm" as="textarea" rows="5" value={this.state.reqDescription} onChange={this.handleRequestDescChange} required/>
              </Col>
            </Form.Group>
            
             {this.state.showScreenshot ?
             (
              <Form.Group as={Row} controlId="formScreenshot" id='formScreenshot'>
                <Form.Label column sm="2">Captura de ecrã: </Form.Label>
                <Col sm="10">
                  <img onClick={this.loadPicture} alt='Screenshot' id='image' height={240} src={this.state.reqScreenshot}/>
                </Col>
              </Form.Group>
            ) 
            : null
             }     

            <Form.Group as={Row} controlId="formAttachments">
              <Form.Label column sm="2">Anexos: </Form.Label>
              <Col sm="10">
                <input id="formControlFile" type="file" multiple onChange={this.handleClick}/>
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
            <div className='containerFormButton'>
              <button className = 'requestFormButton' variant="primary" type="submit">Confirmar</button>
              <button className = 'requestFormButton' type="button" value="cancel" onClick={this.handleCancel}>Cancelar</button>
            </div>
          </Form>
        </div>
      </div>   
    );
  }
}

export default FormPage;
