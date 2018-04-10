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
let opponentShots = [];
let playerShots = [];

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
    console.log(shotCoord);
    const x = shotCoord % 10;
    const y = Math.floor(shotCoord / 10);
    // console.log(opponentBoard);
    let elementPos = rooms.map(function(x) {console.log(x.roomNumber);return x.roomNumber; }).indexOf(roomNumber);
    if(rooms[elementPos].playerId === socketId){
        playerShots.push([rooms[elementPos].opponentBoard[y][x],shotCoord]);
        console.log(playerShots);
        return playerShots;
    }else{
        opponentShots.push([rooms[elementPos].playerBoard[y][x],shotCoord]);
        console.log(opponentShots);
        return opponentShots;
    }
};

let putShip = function(shipsCoord,socketRoom){
    let roomNumber = Number(Object.keys(socketRoom)[0]);
    let socketId = Object.keys(socketRoom)[1];
    let elementPos = rooms.map(function(x) {console.log(x.roomNumber);return x.roomNumber; }).indexOf(roomNumber);

    if(rooms[elementPos].playerId === socketId){
        putShipsOnBoard(shipsCoord,rooms[elementPos].playerBoard);
    }else{
        putShipsOnBoard(shipsCoord,rooms[elementPos].opponentBoard);
    }
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
            opponentId: ''
        });
        createGame(rooms.length - 1);
    }
    numberOfClients++;
    console.log("clients number "+numberOfClients);
    console.log("rooms length " +rooms.length);
    let currentRoom = rooms[rooms.length - 1];
    if (currentRoom.playerId !== socket.id) {
        currentRoom.opponentId = socket.id;
        opponentOnline(rooms.length - 1);
    }
    socket.join(currentRoom.roomNumber);

};

let endConnection = function(socketRoom){
    if(numberOfClients > 0){
        numberOfClients % 2 === 0 ? numberOfClients -=2 : numberOfClients--;
    }

    console.log("clients number afetr dec"+numberOfClients);
    rooms = rooms.filter(( e ) => {
        return e.roomNumber !== Number(socketRoom);
    });
};

module.exports = {
    createBoard,
    connectToRoom,
    shot,
    putShip,
    endConnection
};