import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import TestComponent from './components/test';

class App extends React.Component {
render() {
  return (
    <div className='body-app'>
        <Navbar history={this.props.history}/>
        <h1>COVID-19</h1>
        <TestComponent/>
        </div>
    );
  }
}
export default App;
