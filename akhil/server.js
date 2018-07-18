const express = require('express')
const db = require('./app/config/db.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
upload = require("express-fileupload")


//defining the app
const app = express()

//defining the port
const port = 8000;

app.use(bodyParser.json())
app.use(upload())
//defining mongoose
mongoose.connect(db.url)

  
//defining routes
require('./app/routes/route.js')(app)


//defining port
app.listen(port)
console.log('Server is up on port ' + port)

// var io = require('socket.io').listen(app);
// io.sockets.on('connection', function(client){
//     client.on('message', function(err, msg){
//         client.broadcast.emit('message', msg);
//     });
//  });