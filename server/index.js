require('dotenv').config();
const { server } = require('./server');

server.start(() =>
  console.log(`The server is running on http://localhost:4000`)
);
