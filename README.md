# BattleShips
Battleship game for two players.

## Description

Example application to learn React. You can see demo [here](http://battleships.pawfa.usermd.net/). Every code review and criticism is welcome.


## Getting Started

### Technology Stack
Component                   | Technology
---                         | ---
Frontend                    | [React](https://github.com/facebook/react/)
Backend                     | [NodeJs](https://nodejs.org/en/) and [ExpressJs](https://expressjs.com/)
Client/Server Build Tools   | npm


### Dependencies

- Node 6.0 or above,
- npm 5 or above

### Installing

To install this application, run the following commands:
```bash
git clone https://github.com/pawfa/BattleShips.git
cd BattleShips
```
This will get a copy of the project installed locally.

### Executing program
Before running the application you need to make sure that there is correct url in frontend directory in file Game.js:
```bash
this.socket = io.connect('http://localhost:3003/');
```

To run the server, cd into the `backend` folder and run:
 
```bash
node app.js
```
To run the client, cd into the `frontend` folder and run:
 
```bash
npm install && npm start
```
