import React from 'react';
import './App.css';
import './components/pages/homepage.styles.scss';

import {HomePage} from './components/pages/homepage.component'
import {Switch, Route} from 'react-router-dom'

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
      </Switch>

    </div>
  );
}

export default App;
