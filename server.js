const express = require('express');
const bodyParser = require('body-parser');
const { UDPPort } = require('osc');

const app = express();
app.use(bodyParser.json());

// OSC Setup
const udpPort = new UDPPort({
  localAddress: "0.0.0.0",
  localPort: 3333, // Port for listening
  remoteAddress: "127.0.0.1",
  remotePort: 3334 // Port where Max MSP is listening
});

udpPort.open();

app.post('/harmonize', (req, res) => {
  const note = req.body.note;
  
  // Send OSC message
  udpPort.send({
    address: '/note',
    args: [note]
  });

  res.json({ status: 'Note sent', note });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
