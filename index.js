const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,

    onConnect(session, cb) {
        console.log("OnConnect", session.id);
        cb(); // Proceed to next step
    },

    onMailFrom(address, session, cb) {
        console.log("OnMailFrom", address.address, session.id);
        cb(); // Proceed to next step
    },

    onRcptTo(address, session, cb) {
        console.log("OnRcptTo", address.address, session.id);
        cb(); // Proceed to next step
    },

    onData(stream, session, cb) {
        let emailData = ""; // Store the data chunks

        // Listen for 'data' event to collect the email content
        stream.on('data', (chunk) => {
            emailData += chunk.toString();
        });

        // Listen for 'end' event to complete the data processing
        stream.on('end', () => {
            console.log("OnData Complete:");
            console.log(emailData); // Log the entire email content
            cb(); // Signal that the email has been processed
        });

        // Handle stream errors
        stream.on('error', (err) => {
            console.error("Stream Error:", err);
            cb(err); // Return the error to the client
        });
    }
});

// Start the server on port 25
server.listen(25, () => console.log("SMTP server is listening on port 25"));
