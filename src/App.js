import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css';

import {Login} from './Login';
import {Home} from './Home';


class App extends Component {  
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
         
        </div>  
      </Router>
    );
  }
}

export default App;
