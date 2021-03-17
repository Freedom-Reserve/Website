import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';//Links

import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

// https://github.com/ZhangMYihua/lesson-1
class App extends React.Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     currentUser: null
  //   }HI
  // }

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          console.log('App.js: snapshot.data()',snapshot.data());
          setCurrentUser({
            id: snapshot.id, ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
      //console.log(userAuth);
    });
  }
  /**
          this.setState({
            currentUser: {id: snapshot.id, ...snapshot.data()}
            }, ()=> { console.log(this.state);}
          );

          this.setState({currentUser: userAuth});
*/

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' 
            render={()=> 
              this.props.currentUser ? (<Redirect to='/' />)
              : (<SignInAndSignUpPage />)
            } 
          /> 
        </Switch>
      </div>
    );
  }
}
//component={SignInAndSignUpPage}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
// const mapStateToProps = ({user}) => ({
//   currentUser: user.currentUser
// });//this user is from user reducer

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

/**
 * currentUser={this.state.currentUser}
http://localhost:3000/signin
  
  
const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

      <Route path='/topics/:topicId' component={topicDetail} />

 */