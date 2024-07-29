const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Port number

app.use(bodyParser.json());

app.post('/sendNote', (req, res) => {
  const note = req.body.note;
  console.log(`Received note: ${note}`);
  res.send('Note received');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});