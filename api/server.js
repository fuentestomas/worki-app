const { app } = require('./app');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { ModelMethods: ChatMethods } = require('./modules/chat/methods');
const { ModelMethods: MessageMethods } = require('./modules/message/methods');

// Configuración de la base de datos
mongoose.connect('mongodb+srv://dbuser:worki@workicluster.odp9wzi.mongodb.net/worki').then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

// Configuración del puerto
const PORT = process.env.PORT || 10500;
app.set('port', PORT);

// Creación del servidor HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Servidor corriendo en puerto:', PORT);
});

// Configuración de WebSocket
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('socket id', socket.id);

  socket.on('join', (chatId) => {
    socket.join(chatId);
  });

  socket.on('message', async (messageObj) => {
    console.log(`Received message: ${messageObj.message}`);
    // Creates new chat if not exists
    if (messageObj.chatId === 'none') {
      try {
        const chatMethods = new ChatMethods();
        let newChat = {
          employerId: messageObj.from,
          applierId: messageObj.to
        };
        newChat = await chatMethods.create(newChat);
        messageObj.chatId = newChat._id.toString();
        console.log('newChatId', messageObj.chatId);
        socket.join(messageObj.chatId);
      } catch (e) {
        console.log('ERROR: ', e);
        return;
      }
    }

    //Add message to DB
    let newMessage;
    try {
      const messageMethods = new MessageMethods();
      newMessage = {
        chatId: messageObj.chatId,
        userId: messageObj.from,
        message: messageObj.message
      };
      await messageMethods.create(newMessage);
    }
    catch (e) {
      console.log('ERROR:', e);
      return;
    }

    // Emit the new message to the specific room
    io.to(messageObj.chatId).emit('message', { newMessage });
  });
});
