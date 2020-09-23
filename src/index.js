import '@babel/polyfill';
import dotenv from 'dotenv';

import app from './app';
// import connectDB from './config/database';

dotenv.config();

async function main() {
  // Set-up database
  //   connectDB();
  // Set up server
  const port = app.get('port');
  const server = await app.listen(port, () =>
    console.log('\x1b[36m%s\x1b[0m', `Server started on port ${port}`)
  );
}

main();
