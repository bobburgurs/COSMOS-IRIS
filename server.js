const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

// Event listener for new WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Event listener for messages from clients
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);

    // Echo the message back to the client
    ws.send(`Server received: ${message}`);
  });

  // Event listener for connection close
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});