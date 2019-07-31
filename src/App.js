import React from 'react';
import './App.css';
import './components/pages/homepage.styles.scss';

import HomePage from './components/pages/homepage.component'
import ShopPage from './components/pages/shop/shop.component'
import {Switch, Route} from 'react-router-dom'
import Header from './components/header/header.component'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>

    </div>
  );
}

export default App;
