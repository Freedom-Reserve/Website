import './App.css';
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';//Links
//import logo from './logo.svg';
//import { Form, Button, Input, Label, Message, Dropdown, Grid, } from "semantic-ui-react";
//  Card, Header, Segment, GridRow,
//import { DropDownRewardsCtrts } from "./dropdown";
//import {init, getGasData, getAFIBalance,} from "./ethereum/ethFunc";

import { GetTradeCheck, 
} from "./ethereum/store";
import EthereumContext from "./ethereumContext"; //no {}

import HomePage from './pages/homepage/homepage';
import HomePageHTML from './components/homepageHTML';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


/* ### Note: node-sass 4.14.1 works with given sass 
package.json:
code"resolutions": {"babel-jest": "24.7.1"},
... if you need to fix this version
*/
function App() {

  useEffect(() => {

  }, []); //[] for running once

  //console.log("Compo:", compo);

    return (
      <div className="App" style={{
        color: 'white',
      }}>

          <br></br>

        <Switch>
          <Route exact path='/nft' component={HomePage} />
          <Route path='/' component={HomePageHTML} />
        </Switch>
      </div>
    );
}

export default App;

/*
          <h1>Freedom Reserve: NFT contract</h1>
          <h3>current network: {compo[2]}</h3>
          <h3>current address: {compo[1]}</h3>

          <EthereumContext.Provider value={compo}>

          </EthereumContext.Provider>

<HomePageHTML />
      <Header />
      <Switch>
        <Route exact path='/nft' component={HomePage} />
        <Route path='/home' component={ShopPage} />
      </Switch>
---------== Setup
$ npx create-react-app cra2021pwa --template cra-template-pwa
$ yarn add node-sass

---------== Old App.js
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

 */