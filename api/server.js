const { app } = require('./app');
const http = require('http');
const mongoose = require('mongoose');
const WebSocket = require('ws');

// Configuración de la base de datos
mongoose.connect('mongodb://localhost:27017/worki').then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Creación del servidor HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Servidor corriendo en puerto:', PORT);
});

// Configuración de WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Reenvía el mensaje a todos los clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World');
});
