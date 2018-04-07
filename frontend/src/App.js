import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { sendBoard } from './api';

class App extends Component {

    constructor(){
        super();
        // sendBoard();

    }

    shot(){
        console.log("elton");
        sendBoard();
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <button className="uk-button uk-button-default" onClick={this.shot}>Shot!</button>
      </div>
    );
  }
}

export default App;
