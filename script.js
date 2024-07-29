document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.title-wrapper').classList.add('animate');

  // Initialize the patch when the page is ready
  initializePatch();
});

// Scroll up to the note page when the title is clicked
document.querySelector('.title-wrapper').addEventListener('click', () => {
  document.querySelector('.home-page').style.transform = 'translateY(-100%)';
  document.querySelector('.note-page').style.transform = 'translateY(0)';
});

// Initialize Web Audio API and set up the canvas interaction
async function initializePatch() {
  const canvas = document.getElementById('interactionCanvas');
  const context = new AudioContext();

  // Create a basic oscillator node to use as an example
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 440; // Default frequency
  oscillator.connect(context.destination);
  oscillator.start();

  canvas.onpointermove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // Map pointer positions to frequency and gain (just as an example)
    oscillator.frequency.value = x * 1000; // Frequency range 0 - 1000 Hz

    // Implement additional processing based on `y` value if needed
  };

  // Start the audio context when the user interacts with the page
  document.body.addEventListener('click', () => {
    context.resume();
  });
}

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