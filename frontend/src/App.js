import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {sendShipCoord, getSocket, sendShotCoord} from './api';
import Granim from 'granim';
import {Button, Row} from 'react-materialize';
import OpponentBoard from "./components/OpponentBoard/OpponentBoard";
import PlayerBoard from "./components/PlayerBoard/PlayerBoard";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import {observe} from "./Game";

class App extends Component {
    socket;
    boardtwo = [
        "pierwszy",
        "drugi",
        "trzeci"
    ].map((div, i) => {
        return <div key={i}>{div}</div>
    });
    state = {
        myBoard: [],
        opponentBoard: [],
        shipPosition: []
    };
    constructor(props) {
        super(props);
        this.unobserve = observe(this.handleChange.bind(this))
    }

    handleChange(shipPosition) {
        const nextState = { shipPosition };
        if (this.state) {
            this.setState(nextState)
        } else {
            this.state = nextState
        }
    }

    componentWillUnmount() {
        this.unobserve()
    }

    componentDidMount(){
        this.putShip = this.putShip.bind(this);

        this.socket = getSocket();

        let granimInstance = new Granim({
            element: '#granim-canvas',
            name: 'granim',
            opacity: [1, 1],
            states: {
                "default-state": {
                    gradients: [
                        ['#834D9B', '#D04ED6'],
                        ['#1CD8D2', '#93EDC7']
                    ]
                }
            }
        });

        this.socket.on('emptyBoard', (data) => {
            console.log(data);
            this.setState({
                myBoard: data.emptyPlayerBoard,
                opponentBoard: data.emptyOpponentBoard
            });
            console.log(this.state.myBoard);
        });
/*
        this.socket.on('opponentBoard', (data) => {
            const tmpBoard = this.state.opponentBoard;
            tmpBoard[data.msg[0]][data.msg[1]] = data.msg[2];
            this.setState({
                opponentBoard: tmpBoard
            });
        });

        this.socket.on('putShip', (data) => {
            console.log(data.msg);
            this.setState({
                myBoard: data.msg
            });
        });
        this.socket.on('opponentDisconnected', () => {
            console.log("disconnected opponent");
            this.socket.disconnect();
            alert('Opponent disconnected');
        });
*/
    }

    shot = (event) => {
        sendShotCoord(event);
    };

    putShip(event) {
        sendShipCoord(event);
    }

    render() {
        const { shipPosition } = this.state;
        console.log(this.state.shipPosition);
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<h1 className="App-title">Welcome to React</h1>*/}
                {/*</header>*/}
                {/*<Button waves='light' onClick={this.shot}>Shot!</Button>*/}
                <Row className="main">
                    <OpponentBoard board={this.state.opponentBoard} shot={this.shot}/>
                    {/*<PlayerBoard shipPosition={shipPosition} board={this.state.myBoard} putShip={this.putShip}/>*/}
                    <PlayerBoard shipPosition={shipPosition}/>
                </Row>

            </div>
        );
    }


}
// export default App;
export default DragDropContext(HTML5Backend)(App);

