var http = require('http');
var port = 3000; // This should match the port your Node.js server is listening on

function sendNoteToServer(note) {
    var options = {
        hostname: 'localhost',
        port: port,
        path: '/sendNote',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            post("Received response from server: " + chunk);
        });
    });

    req.on('error', function(e) {
        post('Problem with request: ' + e.message);
    });

    // Write data to request body
    req.write(JSON.stringify({ note: note }));
    req.end();
}

function bang() {
    var note = "C4"; // Example note or get from Max if needed
    sendNoteToServer(note);
}

// Export functions to Max
exports.bang = bang;