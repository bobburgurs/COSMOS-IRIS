const express = require('express');
const bodyParser = require('body-parser');
const osc = require('node-osc');

const app = express();
app.use(bodyParser.json());

const oscClient = new osc.Client('127.0.0.1', 3334); // Connect to Max MSP at port 3334

function sendNote() {
  const note = document.getElementById('noteInput').value;
  console.log(`Sending note: ${note}`);

  // Create an OSC client instance
  const oscClient = new osc.Client('127.0.0.1', 3334);

  // Send the note to Max using OSC
  oscClient.send('/note', note, (err) => {
    if (err) {
      console.error('Error sending OSC message:', err);
      return; // Handle error gracefully
    }
    console.log(`Sent note to Max: ${note}`);
  });
}

const PORT = 3334;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});