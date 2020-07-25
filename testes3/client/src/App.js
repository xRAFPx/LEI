import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import {Button} from 'react-bootstrap'


function App() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {

    }

    axios.post("/api/receiveEmail", dataToSubmit)
  }
  return (
    <form onSubmit={handleSubmit}>
        <Button className="float-right" variant="outline-primary" onClick={handleSubmit}>Submeter</Button>
    </form>
  );
}

export default App;
