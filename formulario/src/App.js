import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Covid from './components/Covid';

class App extends React.Component {
render() {
  return (
    <div className='body-app'>
      <Navbar history={this.props.history}/>
      <h1>COVID-19</h1>
      <Covid/>
    </div>
    );
  }
}
export default App;
