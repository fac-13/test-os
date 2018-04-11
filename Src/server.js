const http = require('http');
const router = require('./router');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4300;

http.createServer(router).listen(port, () => {
  console.log(`Magic happens at http://${host}:${port}`);
});