import socketIo from 'socket.io';

let io;

export default {
  init: (httpServer) => {
    io = socketIo(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};
