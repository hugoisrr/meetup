import '@babel/polyfill';
import dotenv from 'dotenv';

import app from './app';
import connectDB from './config/database';
import socketIO from './config/socketio';

dotenv.config();

async function main() {
  // Set-up database
  connectDB();
  // Set up server
  const port = app.get('port');
  const server = await app.listen(port, () =>
    console.log('\x1b[36m%s\x1b[0m', `Server started on port ${port}`)
  );

  // Setup Socket io connection
  const io = socketIO.init(server);
  io.on('connection', (clientSocket) => {
    console.log(
      '\x1b[40m%s\x1b[0m',
      `Client connected to Server ${clientSocket.id}`
    );
  });
}

main();
