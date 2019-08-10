import React from 'react';

import './App.css';
import './components/pages/homepage.styles.scss';

import { connect } from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

import Header from './components/header/header.component'
import HomePage from './components/pages/homepage.component'
import ShopPage from './components/pages/shop/shop.component'
import CheckoutPage from './components/pages/checkout/checkout.component'
import SingInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

import { setCurrentUser} from './redux/user/user.actions' 
import { selectCurrentUser } from './redux/user/user.selectors'

import { createStructuredSelector } from 'reselect';

class App extends React.Component {

  unsubscribeFromAuth = null;


  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth)
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {   
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SingInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
