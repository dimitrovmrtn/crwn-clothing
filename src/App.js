import React from 'react';
import './App.css';
import './components/pages/homepage.styles.scss';

import HomePage from './components/pages/homepage.component'
import ShopPage from './components/pages/shop/shop.component'
import {Switch, Route} from 'react-router-dom'
import Header from './components/header/header.component'
import SingInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth} from './firebase/firebase.utils'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null


  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {   
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SingInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
