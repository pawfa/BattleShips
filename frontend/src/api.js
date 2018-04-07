import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3003');
socket.on('news', () => {
    socket.emit('test',{
        msg: 'Testowa'
    });
    console.log("dziala")
});

function sendBoard() {
    socket.emit('my other event');

    // socket.emit('subscribeToTimer', 1000);
}
function getSocket(){
    return socket;
}
export { sendBoard, getSocket }