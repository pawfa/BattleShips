import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3003');

function sendShipCoord(coord){
    socket.emit('shipCoord',coord)
}

function sendShotCoord(shotCoord){
    socket.emit('shotCoord',shotCoord);
}
function getSocket(){
    return socket;
}
export { getSocket, sendShotCoord, sendShipCoord }