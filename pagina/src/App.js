import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App  extends Component{

  async postData(){
      try{
          let result= await fetch('https://webhook.site/60821a8a-fe1b-4c64-849a-6d982b94e6a9', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                key1: 'myusername'
            })
          });
          console.log('result' + result)
      }catch(e){
        console.log(e)
      }
  }
  render() {

    return (
      <div className="App">
        <button onClick={() => this.postData() } className="Button">Press me!</button>
      </div>
    );
  }
} 

export default App;
