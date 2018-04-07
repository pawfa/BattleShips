import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { sendBoard, getSocket } from './api';
import Granim from 'granim';

class App extends Component {
    socket;
    board = [];
    boardtwo = [
        "pierwszy",
        "drugi",
        "trzeci"
    ].map((div, i)=>{return <div key={i}>{div}</div>});

    constructor(){
        super();
        // sendBoard();
        this.state = {board: []};
        this.state = []
        this.socket = getSocket();
        this.socket.on('board', (data)=>{
            // this.board = data.msg;
            for (let i = 0; i < 10; i++) {
                this.board.push(<span className='board' key={i}>data.msg[i]</span>);
            }
            this.state.board = this.board;
            console.log(this.state.board);
        });

        let granimInstance = new Granim({
            element: '#granim-canvas',
            name: 'granim',
            opacity: [1, 1],
            states : {
                "default-state": {
                    gradients: [
                        ['#834D9B', '#D04ED6'],
                        ['#1CD8D2', '#93EDC7']
                    ]
                }
            }
        });
    }

    shot(){
        console.log("elton");
        sendBoard();
    }


  render() {
    console.log(this.board);
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
          {this.boardtwo}
      </div>
    );
  }
}

export default App;
