document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.title-wrapper').classList.add('animate');
});

// Scroll up to the note page when the title is clicked
document.querySelector('.title-wrapper').addEventListener('click', () => {
  document.querySelector('.home-page').style.transform = 'translateY(-100%)';
  document.querySelector('.note-page').style.transform = 'translateY(0)';
});

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

// Function to transition to the note page
function goToNotePage() {
  const homePage = document.getElementById('homePage');
  const notePage = document.getElementById('notePage');

  homePage.style.transform = 'translateY(-100%)';
  notePage.style.transform = 'translateY(0)';
}