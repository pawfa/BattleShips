let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let shot = require('./service/board.service').shot;
let putShip = require('./service/board.service').putShip;
let endConnection = require('./service/board.service').endConnection;
let restart = require('./service/board.service').restart;

let connectToRoom = require('./service/board.service').connectToRoom;

let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
server.listen(3003);

io.on('connection', function (socket) {

    connectToRoom(socket);

    socket.on('newGame',()=>{
        restart(socket.rooms);
    });

    socket.on('shotCoord', function (data) {
        let shotData = shot(data, socket.rooms);
        let {shots, hits} = shotData;

        socket.broadcast.to(Number(Object.keys(socket.rooms)[0])).emit('opponentShotStatus', {
            msg: shots,
            gameStatus: 'Your turn'
        });
        socket.emit('shotStatus', {
            msg: shots,
            gameStatus: 'Waiting for opponent shot'
        });

        if(hits === 14){
            socket.emit('turnStatus',{
                msg: 'You won'
            });

            socket.broadcast.to(Number(Object.keys(socket.rooms)[0])).emit('turnStatus', {
                msg: 'You lost'
            });

        }

    });

    socket.on('shipsAreReady', function (data) {

        if(putShip(data, socket.rooms).length === 1){
            socket.emit('turnStatus', {
                msg: 'Waiting for opponent'
            })
        }else{
            let roomNumber = Number(Object.keys(socket.rooms)[0]);
            socket.emit('turnStatus',{
                msg: 'Waiting for opponent shot'
            });
            socket.broadcast.to(roomNumber).emit('turnStatus', {
                msg: 'Your turn'
            })
        }

    });

    socket.on('disconnecting', function () {
        socket.to(Object.keys(socket.rooms)[0]).emit('opponentDisconnected');
        console.log("disconnecting");
        endConnection(Object.keys(socket.rooms)[0]);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
