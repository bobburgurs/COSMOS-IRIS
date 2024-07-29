const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

app.post('/harmonize', (req, res) => {
  const note = req.body.note;

  // Call Max MSP script with the input note
  exec(`path_to_your_max_script ${note}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Error harmonizing note' });
    }

    const harmonizedNotes = JSON.parse(stdout); // Assuming the script returns JSON

    res.json({ harmonizedNotes });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});