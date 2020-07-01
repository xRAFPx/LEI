import React from 'react';
import './App.css';

function App(){

  const sayHello = () =>{
    console.log('hello');
    window.open("https://streamlabs.com/MadDogz_/tip");
  }
  return(
    <div className="app">
      <button className="button" onClick={sayHello}>Confirmar</button>
      <button>Cancelar</button>
    </div>
  )
}

export default App;