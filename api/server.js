const {app} = require('./app');
const http = require('http');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/worki');

http.createServer(app).listen(app.get('port'), () => {
    console.log('Servidor corriendo en puerto: ', app.get('port'))
});
