require('dotenv').config();
const { server } = require('./server');

server.start(() =>
  console.log(`The server is running on port ${process.env.PORT || 4000}`)
);
