const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString());
  });
}).on('error', (err) => {
  // handle errors here
  throw err;
});

// grab an arbitrary unused port.
server.listen(10000,() => {
  console.log('opened server on', server.address());
});