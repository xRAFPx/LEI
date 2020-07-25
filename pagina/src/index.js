import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppPage from './App';
import FormPage from './components/Form';
import NotFoundPage from './components/NotFound';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Switch>
          <Route exact path="/" component={AppPage} />
          <Route path="/form" component={FormPage} />
          <Route component={NotFoundPage} />
        </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
