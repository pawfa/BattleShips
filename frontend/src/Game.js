import openSocket from 'socket.io-client';

const socket = openSocket('http://back_battleships.pawfa.usermd.net:3003');
// const socket = openSocket('http://localhost:3003');
let shipsPosition = {
    cruiser: [[0, 0], [1, 0]],
    destroyer: [[3, 4], [4, 4], [5, 4]],
    battleship: [[3, 0], [4, 0], [5, 0], [6, 0]],
    aircraftCarrier: [[5, 3], [6, 3], [7, 3], [8, 3], [9, 3]]
};


export function shipsAreReady() {
    socket.emit('shipsAreReady', shipsPosition);
}

export function sendShotCoord(shotCoord) {
    socket.emit('shotCoord', shotCoord);

}

export function getSocket() {
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

export function canDropShip(toX, toY, shipLength, shipPart) {
    const endShip = toX + shipLength - shipPart;
    const begShip = toX - shipPart;
    if (endShip > 10 || begShip < 0) {
        return false;
    } else {
        for (const key of Object.keys(shipsPosition)) {
            let begShipExisting = shipsPosition[key][0][0];
            let endShipExisting = shipsPosition[key][0][0] + shipsPosition[key].length - 1;
            if (shipsPosition[key].length !== shipLength && toY === shipsPosition[key][0][1] && ((begShip <= endShipExisting && begShip >= begShipExisting - (shipLength - 1)))) {
                return false;
            }
        }
    }

    return (
        true
    )
}

export function moveShip(arr, shipLength, shipPart) {
    let shipType = translateLength(shipLength);

    shipsPosition[shipType][shipPart] = arr;
    shipsPosition[shipType].forEach(
        (e, index) => {
            e[0] = index - shipPart + arr[0];
            e[1] = arr[1];
        }
    );
    emitChange()
}

function translateLength(shipLength) {
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
    return shipType;
}