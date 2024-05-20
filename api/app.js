const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

let port = 3000;
app.set('port', port);

app.use(cors())
app.use(bodyParser.json());

function loadRoutes() {
    const modulesPath = path.join(__dirname, 'modules');

    fs.readdirSync(modulesPath).forEach((folder) => {
        const folderPath = path.join(modulesPath, folder);

        if (fs.lstatSync(folderPath).isDirectory()) {
            const routeFilePath = path.join(folderPath, 'route.js');

            if (fs.existsSync(routeFilePath)) {
                const prefix = `/${folder}`;
                const { router } = require(routeFilePath);
                
                app.use(prefix, router);

                console.log('Modulo cargado:', prefix)
            }
        }
    });
};

loadRoutes();

app.use('/', (req, res) => res.send('Bienvenido a mi api'));

mongoose.connect('mongodb://localhost:27017/worki');

http.createServer(app).listen(app.get('port'), () => {
    console.log('Servidor corriendo en puerto: ', port)
});