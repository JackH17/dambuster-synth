import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import Dambuster from './Containers/Dambuster'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Dambuster {...props}/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
