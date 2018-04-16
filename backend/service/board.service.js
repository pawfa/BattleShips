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
    let elementPos = rooms.map(function(x) {return x.roomNumber; }).indexOf(roomNumber);
    const x = shotCoord % 10;
    const y = Math.floor(shotCoord / 10);


    let room = rooms[elementPos];
    if(room.playerId === socketId){
        if(room.opponentBoard[y][x] !== 0){
                room.playerHits++;
        }
        room.playerShots.push([room.opponentBoard[y][x],shotCoord]);
        return [room.playerShots, room.playerHits];
    }else{
        if(room.playerBoard[y][x] !== 0){
            room.opponentHits++;
        }
        room.opponentShots.push([room.playerBoard[y][x],shotCoord]);
        return [room.opponentShots,room.opponentHits];
    }
};

let putShip = function(shipsCoord,socketRoom){
    let roomNumber = Number(Object.keys(socketRoom)[0]);
    let socketId = Object.keys(socketRoom)[1];
    let elementPos = rooms.map(function(x) {return x.roomNumber; }).indexOf(roomNumber);

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

let createGame = function (roomNumber) {
    rooms[roomNumber].playerBoard = createBoard();
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
            opponentShots: [],
            playerHits: 0,
            opponentHits: 0,
            playAgain: 0
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
    if(numberOfClients > 0){
        numberOfClients % 2 === 0 ? numberOfClients -=2 : numberOfClients--;
    }

    rooms = rooms.filter(( e ) => {
        return e.roomNumber !== Number(socketRoom);
    });
    console.log("endconnection");
};

let restart = function(socketRoom){
    console.log(socketRoom);
    console.log(rooms);
    let roomNumber = Number(Object.keys(socketRoom)[0]);
    let elementPos = rooms.map(function(x) {return x.roomNumber; }).indexOf(roomNumber);

    if(rooms[elementPos]['playAgain'] === 0){
        rooms[elementPos]['playAgain']++;
    }else{
        let props = {
            turns:[],
            playerShots: [],
            opponentShots: [],
            playerHits: 0,
            opponentHits: 0
        };
        for(let p in props) rooms[elementPos][p] = props[p];
    }


};

module.exports = {
    connectToRoom,
    shot,
    putShip,
    endConnection,
    restart
};