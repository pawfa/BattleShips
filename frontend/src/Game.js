import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3003');
let shipsPosition = {
    cruiser: [[0,0],[1,0]],
    destroyer: [[3,4],[4,4],[5,4]],
    battleship: [[3,0],[4,0],[5,0],[6,0]],
    aircraftCarrier: [[5,3],[6,3],[7,3],[8,3],[9,3]]
};


export function shipsAreReady(){
    socket.emit('shipsAreReady',shipsPosition);
}

export function sendShotCoord(shotCoord){
    // console.log(shotCoord);
    socket.emit('shotCoord',shotCoord);

}

export function getSocket(){
    return socket;
}

let observer = null;

function emitChange() {
    observer(shipsPosition)
}

export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.')
    }

    observer = o;
    emitChange();

    return () => {
        observer = null
    }
}

// export function canMoveKnight(toX, toY) {
//     const [x, y] = knightPosition;
//     const dx = toX - x;
//     const dy = toY - y;
//
//     return (
//         (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
//         (Math.abs(dx) === 1 && Math.abs(dy) === 2)
//     )
// }

export function moveShip(arr, shipLength, shipPart) {
    let shipType = '';
    switch (shipLength) {
        case 2:
            shipType = 'cruiser';
            break;
        case 3:
            shipType = 'destroyer';
            break;
        case 4:
            shipType = 'battleship';
            break;
        case 5:
            shipType = 'aircraftCarrier';
            break;
    }

    shipsPosition[shipType][shipPart] = arr;
    shipsPosition[shipType].forEach(
        (e,index) =>{
            e[0] = index-shipPart+arr[0];
            e[1] = arr[1];
        }
    );
    emitChange()
}