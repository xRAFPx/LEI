import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ScreenCapture from './ScreenCapture'
import './style.css';
import screenshot from './Screenshot.jpg';

class App extends Component {
  state = {
    screenCapture: ''
  }

  handleScreenCapture = (screenCapture) => {
    this.setState({screenCapture})
    document.getElementById("myModal").style.display = 'block';
  }

  render() {
    const { screenCapture } = this.state
  
    const closePicture = event => {
      document.getElementById("myModal").style.display = 'none';
    }

    return (
      <div>
        <ScreenCapture onEndCapture={this.handleScreenCapture}>
          {({ onStartCapture }) => (
            <Fragment>
              <button onClick={onStartCapture}>Capture</button>
              <img src={screenshot} width="100%"/>
            </Fragment>
          )}
        </ScreenCapture>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="inner-block">
              <img id="img" alt="open" src={screenCapture} width="100%"/><br/>
              <button className = 'requestButton' variant="primary" type="submit">Submeter</button>
              <button className = 'requestButton' type="button" value="cancel" onClick={closePicture}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
