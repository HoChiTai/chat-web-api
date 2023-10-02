import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import { Server } from 'socket.io';

import MessageModel from './app/models/MessageModel';

const app = express();
const port = 8321;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Add logger
app.use(morgan('combined'));

// CORS
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

// Route
routes(app);

// Socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH'],
  },
});

const onlineUser = new Map();
io.on('connection', (socket) => {
  socket.on('add_user', (id) => {
    onlineUser.set(id, socket.id);
  });

  socket.on('send_message', (data) => {
    try {
      const sendUserSocket = onlineUser.get(data.receiver_id);

      MessageModel.createMessage(data, (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          socket.to(sendUserSocket).emit('receive_message', data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
