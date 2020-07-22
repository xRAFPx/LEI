import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ScreenCapture from './ScreenCapture'
import './style.css';
import {Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'

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
            </Fragment>
          )}
        </ScreenCapture>
        <div id="myModal" className="modal">
          <img className="modal-content" src={screenCapture} alt="open"/>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
