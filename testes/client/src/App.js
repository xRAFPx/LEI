import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import service from "./data/service.json";
import requestType from "./data/requestType.json";
import requestNature from "./data/requestNature.json";
import requestPriority from "./data/requestPriority.json";
import screenshot from './data/Screenshot.jpg';
import header from './data/header.png';
import {Container} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {InputGroup} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import {Button} from 'react-bootstrap'


function App() {
  const [tipoPedido, setTipoPedido] = useState('')
  const [naturezaPedido, setnaturezaPedido] = useState('')
  const [servico, setServico] = useState('')
  const [requesitante, setRequesitante] = useState('')
  const [email, setEmail] = useState('')
  const [contacto, setContacto] = useState('')
  const [erro, setErro] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [imagem, setImagem] = useState('')
  const [ficheiros, setFicheiros] = useState('')

  const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  const handleClick = (e) =>{
    e.preventDefault();
    if(e.target.id === "tipoPedido"){
      setTipoPedido(e.target.value);
    } else if(e.target.id === "naturezaPedido"){
      setnaturezaPedido(e.target.value);
    } else if(e.target.id === "servico"){
      setServico(e.target.value);
    } else if(e.target.id === "requesitante"){
      setRequesitante(e.target.value);
    } else if(e.target.id === "email"){
      setEmail(e.target.value);
    } else if(e.target.id === "contacto"){
      setContacto(e.target.value);
    } else if(e.target.id === "erro"){
      setErro(e.target.value);
    } else if(e.target.id === "descricao"){
      setDescricao(e.target.value);
    } else if(e.target.id === "prioridade"){
      setPrioridade(e.target.value);
    } else {
      var nomes = [];

      Array.from(e.target.files).forEach(async f => {
        nomes.push({ filename: f.name, contentType: f.type, content: await readUploadedFileAsText(f)})
      });
      setFicheiros(nomes);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setImagem(document.getElementById("imagem"));

    const dataToSubmit = {
      tipoPedido,
      naturezaPedido,
      servico,
      requesitante,
      email,
      contacto,
      erro,
      descricao,
      prioridade,
      imagem,
      ficheiros
    }
    axios.post("/api/sendMail", dataToSubmit)
     .then(res => {
       console.log(res.data);
     })
  }
  
  const loadPicture = event =>{
    document.getElementById("myModal").style.display = 'block';
    document.getElementById("img").src = screenshot;
  }

  const closePicture = event => {
    document.getElementById("myModal").style.display = 'none';
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <div id="myModal" className="modal">
          <span className="close" onClick={closePicture}>&times;</span>
          <img className="modal-content" id="img" alt="open"/>
        </div>
        <Row>
          <Col style={{height: '150px'}}>
            <Image style={{width: '100%'}} src={header} fluid/>
          </Col>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Control id="tipoPedido" as="select" defaultValue="Tipo de pedido" onChange={handleClick}>
              <option disabled>Tipo de pedido</option>
              {requestType.map((e, key) => {
                  return <option key={key} value={e.Key}>{e.Value}</option>;
                })}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control id="naturezaPedido" as="select" defaultValue="Natureza de pedido" onChange={handleClick}>
              <option disabled>Natureza de pedido</option>
              {requestNature.map((e, key) => {
                  return <option key={key} value={e.Key}>{e.Value}</option>;
              })}
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Control id="servico" as="select" defaultValue="Serviço" onChange={handleClick}>
              <option disabled>Serviço</option>
              {service.map((e, key) => {
                  return <option key={key} value={e.Key}>{e.Value}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <InputGroup as={Col} className="mb-3">
            <FormControl id="requesitante" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Requesitante" onChange={handleClick}/>
          </InputGroup>
        </Row>
        <Row>
        <InputGroup as={Col} className="mb-3">
            <FormControl id="email" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Email" onChange={handleClick}/>
          </InputGroup>
          <InputGroup as={Col} className="mb-3">
            <FormControl id="contacto" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Contacto" onChange={handleClick}/>
          </InputGroup>
        </Row>
        <InputGroup className="mb-3">
          <FormControl id="erro" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Erro" onChange={handleClick}/>
        </InputGroup>
        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control id="descricao" as="textarea" rows="6" onChange={handleClick}/>
        </Form.Group>
        <Form.Group>
          <Form.Control id="prioridade" as="select" defaultValue="Prioridade" onChange={handleClick}>
            <option disabled>Prioridade</option>
            {requestPriority.map((e, key) => {
                return <option key={key} value={e.Key}>{e.Value}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <Form.Label>Screenshot</Form.Label>
        <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Image id="imagem" src={screenshot} fluid onClick={loadPicture}/>
        </Col>
        </Row>
        <p/>
        <div className="form-group files">
          <label>Upload Your File </label>
          <input id="ficheiros"  type="file" className="input-file" multiple onChange={handleClick}/>
        </div>   
        <Button className="float-right" variant="outline-primary" onClick={handleSubmit}>Submeter</Button>
      </Container>
    </form>
  );
}

export default App;
