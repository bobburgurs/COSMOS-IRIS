document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.title-wrapper').classList.add('animate');
});

// Scroll up to the note page when the title is clicked
document.querySelector('.title-wrapper').addEventListener('click', () => {
  document.querySelector('.home-page').style.transform = 'translateY(-100%)';
  document.querySelector('.note-page').style.transform = 'translateY(0)';
});

async function sendNote() {
  const note = document.getElementById('noteInput').value;

  try {
    const response = await fetch('/harmonize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ note: note })
    });

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}