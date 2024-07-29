document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.title-wrapper').classList.add('animate');
});

// Scroll up to the note page when the title is clicked
document.querySelector('.title-wrapper').addEventListener('click', () => {
  document.querySelector('.home-page').style.transform = 'translateY(-100%)';
  document.querySelector('.note-page').style.transform = 'translateY(0)';
});
async function goToMainPage() {
  const homePage = document.getElementById('homePage');
  const notePage = document.getElementById('notePage');
  
  homePage.style.transform = 'translateY(-100%)';
  notePage.style.transform = 'translateY(0)';
}

async function initializePatch() {
  const canvas = document.getElementById('interactionCanvas');
  const context = new AudioContext(); // Web Audio API context

  const position = { x: 5.00, y: 3.00 };
  const response = await fetch('patch.export.json');
  const patcher = await response.json();
  const device = await RNBO.createDevice({
    patcher: patcher,
    context: context
  });

  const start = device.parametersById.get('start');
  const speed = device.parametersById.get('speed');

  canvas.onpointermove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    start.value = x * position.x;
    speed.value = y * position.y;
  };

  // Start the audio context when the user interacts with the page
  document.body.addEventListener('click', () => {
    context.resume();
  });
}

initializePatch();

function sendNote() {
  const note = document.getElementById('noteInput').value;
  fetch('/sendNote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ note: note })
  })
  .then(response => response.text())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}



// start of open sound control to connect 

const osc = require('osc-min');

// Assuming you have a WebSocket server to handle OSC communication
const ws = new WebSocket('ws://localhost:8080'); // Replace with your server address

ws.onmessage = function (event) {
  const oscMessage = osc.fromBuffer(new Uint8Array(event.data));
  console.log('Received OSC Message:', oscMessage);
  // Process the OSC message as needed
};