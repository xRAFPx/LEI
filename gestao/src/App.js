import React from 'react';
import './App.css';
import screenshot from './Screenshot.jpg';
import header from './header.png';
import {Container} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {InputGroup} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
 
function App() {

  const onChangeHandler=event=>{

    console.log(event.target.files)

  }

  return (
      <Container>
        <Row>
          <Col style={{height: '150px'}}>
            <Image style={{width: '100%'}} src={header} fluid/>
          </Col>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" defaultValue="Tipo de pedido">
              <option disabled>Tipo de pedido</option>
              <option>1</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" defaultValue="Natureza de pedido">
              <option disabled>Natureza de pedido</option>
              <option>1</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" defaultValue="Serviço">
              <option disabled>Serviço</option>
              <option>1</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" defaultValue="Requisitante">
              <option disabled>Requisitante</option>
              <option>1</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" defaultValue="Email">
              <option disabled>Email</option>
              <option>1</option>
            </Form.Control>
          </Form.Group>
          <InputGroup as={Col} className="mb-3">
            <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Contacto"/>
          </InputGroup>
        </Row>
        <InputGroup className="mb-3">
          <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Erro"/>
        </InputGroup>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" rows="6" />
        </Form.Group>
        <Form.Group controlId="formGridState">
          <Form.Control as="select" defaultValue="Prioridade">
            <option disabled>Prioridade</option>
            <option>1</option>
          </Form.Control>
        </Form.Group>
        <Form.Label>Screenshot</Form.Label>
        <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Image src={screenshot} fluid/>
        </Col>
        </Row>
        <p/>
        <form method="post" action="#" id="#">
          <div class="form-group files">
            <label>Upload Your File </label>
            <input type="file" name="file" multiple onChange={onChangeHandler}/>
          </div>   
        </form>
        <Button type="submit" className="float-right" variant="outline-primary">Submeter</Button>{' '}
      </Container>
  );
}

export default App;
