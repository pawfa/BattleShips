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
    let x = Math.floor(shotCoord % 10);
    let y = Math.floor(shotCoord / 10 % 10);
    let elementPos = rooms.map(function(x) {console.log(x.roomNumber);return x.roomNumber; }).indexOf(roomNumber);
    if(rooms[elementPos].playerId === socketId){
        return opponentBoard[y][x] !== 1 ? [y,x,2] : [y,x, 3] ;
    }else{
        return playerBoard[y][x] !== 1 ? [y,x,2] : [y,x, 3];
    }
};

let putShip = function(coord,socketRoom){
    let roomNumber = Number(Object.keys(socketRoom)[0]);
    let socketId = Object.keys(socketRoom)[1];
    let x = Math.floor(coord % 10);
    let y = Math.floor(coord / 10 % 10);
    let elementPos = rooms.map(function(x) {console.log(x.roomNumber);return x.roomNumber; }).indexOf(roomNumber);
    if(rooms[elementPos].playerId === socketId){
        playerBoard[y][x] = 1;
        return playerBoard;
    }else{
        opponentBoard[y][x] = 1;
        return opponentBoard;
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
            opponentId: ''
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

};

let endConnection = function(socketRoom){
    rooms = rooms.filter(( e ) => {
        return e.roomNumber != socketRoom;
    });
    console.log(rooms);

};

module.exports = {
    createBoard,
    connectToRoom,
    shot,
    putShip,
    endConnection
};