let opponentBoard = [];
let playerBoard = [];

for (let i = 0; i < 10; i++) {
    opponentBoard[i] = [];
    playerBoard[i] = [];

    for (let j = 0; j < 10; j++) {
        opponentBoard[i][j] = 0;
        playerBoard[i][j] = 0;
    }
}


let rooms = [];
let roomNumber = 0;
let numberOfClients = 0;
// let opponentShots = [];
// let playerShots = [];

let createBoard = function () {
    let board = [];
    for (let i = 0; i < 10; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i][j] = 0;
        }
    }
    return board;
};

let shot = function (shotCoord, socketRoom) {
    let roomNumber = Number(Object.keys(socketRoom)[0]);
    let socketId = Object.keys(socketRoom)[1];
    let elementPos = rooms.map(function(x) {return x.roomNumber; }).indexOf(roomNumber);
    const x = shotCoord % 10;
    const y = Math.floor(shotCoord / 10);

    if(rooms[elementPos].playerId === socketId){
        rooms[elementPos].playerShots.push([rooms[elementPos].opponentBoard[y][x],shotCoord]);
        return rooms[elementPos].playerShots;
    }else{
        rooms[elementPos].opponentShots.push([rooms[elementPos].playerBoard[y][x],shotCoord]);
        return rooms[elementPos].opponentShots;
    }
};

let putShip = function(shipsCoord,socketRoom){
    let roomNumber = Number(Object.keys(socketRoom)[0]);
    let socketId = Object.keys(socketRoom)[1];
    let elementPos = rooms.map(function(x) {console.log(x.roomNumber);return x.roomNumber; }).indexOf(roomNumber);

    if(rooms[elementPos].playerId === socketId){
        rooms[elementPos].turns.push('player');
        putShipsOnBoard(shipsCoord,rooms[elementPos].playerBoard);
    }else{
        rooms[elementPos].turns.push('opponent');
        putShipsOnBoard(shipsCoord,rooms[elementPos].opponentBoard);
    }
    return rooms[elementPos].turns;
};

let putShipsOnBoard = function(shipsCoord,board){
    for(let ship in shipsCoord){
        if (shipsCoord.hasOwnProperty(ship)) {
            let shipArray = Array.from(shipsCoord[ship]);
            for(let i = 0; i < shipArray.length; i++){
                board[shipArray[i][1]][shipArray[i][0]] = ship;
            }
        }
    }
};

let createGame = function (data) {
    rooms[data].playerBoard = createBoard();
    console.log('created game');
};

let opponentOnline = function (roomNumber) {
    rooms[roomNumber].opponentBoard = createBoard();
    console.log('Opponent connected');

};
let connectToRoom = function (socket) {

    if (numberOfClients % 2 === 0) {
        rooms.push({
            roomNumber: roomNumber++,
            playerId: socket.id,
            opponentId: '',
            turns:[],
            playerShots: [],
            opponentShots: []
        });
        createGame(rooms.length - 1);
    }

    numberOfClients++;
    let currentRoom = rooms[rooms.length - 1];
    if (currentRoom.playerId !== socket.id) {
        currentRoom.opponentId = socket.id;
        opponentOnline(rooms.length - 1);
    }
    socket.join(currentRoom.roomNumber);
    console.log("connectroom");
    console.log(rooms);

};

let endConnection = function(socketRoom){
    if(numberOfClients > 0){
        numberOfClients % 2 === 0 ? numberOfClients -=2 : numberOfClients--;
    }

    rooms = rooms.filter(( e ) => {
        return e.roomNumber !== Number(socketRoom);
    });
    console.log("endconnection");
    console.log(rooms);
};

module.exports = {
    createBoard,
    connectToRoom,
    shot,
    putShip,
    endConnection
};