import { Server } from 'socket.io';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL as string;

const subscriber = new Redis(REDIS_URL);

const socketServer = new Server({ cors: { origin: '*' } });

socketServer.on('connection', (clientSocket) => {
  console.log('Connection on socket server from: ', clientSocket.id);

  clientSocket.on('subscribe', (channel) => {
    console.log('Subscribing to channel: ', channel);
    clientSocket.join(channel);
    clientSocket.emit('message', `Joined ${clientSocket}`);
  });
});

socketServer.listen(9001);

export const initializeRedis = async () => {
  subscriber.psubscribe('logs:*');
  subscriber.on('pmessage', (pattern, channel, message) => {
    socketServer.to(channel).emit('message', message);
  });
};
