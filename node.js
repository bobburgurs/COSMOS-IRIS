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

function goToHomePage() {
  document.querySelector('.home-page').style.transform = 'translateY(0)';
  document.querySelector('.note-page').style.transform = 'translateY(100%)';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.title-wrapper').classList.add('animate');
  initializePatch();
  
  document.querySelector('.title-wrapper').addEventListener('click', () => {
    document.querySelector('.home-page').style.transform = 'translateY(-100%)';
    document.querySelector('.note-page').style.transform = 'translateY(0)';
  });
});

async function initializePatch() {
  const canvas = document.getElementById('interactionCanvas');
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 440;
  oscillator.connect(context.destination);
  oscillator.start();

  canvas.onpointermove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    oscillator.frequency.value = x * 1000;
  };

  document.body.addEventListener('click', () => {
    context.resume();
  });
}
