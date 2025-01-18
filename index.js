const SMTPServer = require("smtp-server").SMTPServer;
const { simpleParser } = require("mailparser");

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,

    onConnect(session, cb) {
        console.log("OnConnect", session.id);
        cb(); // Allow connection
    },

    onMailFrom(address, session, cb) {
        console.log("OnMailFrom", address.address, session.id);
        cb(); // Allow sender
    },

    onRcptTo(address, session, cb) {
        console.log("OnRcptTo", address.address, session.id);
        cb(); // Allow recipient
    },

    onData(stream, session, cb) {
        simpleParser(stream)
            .then(parsed => {
                console.log("Parsed Email:");
                console.log("From:", parsed.from.text); // Sender
                console.log("To:", parsed.to.text);     // Recipients
                console.log("Subject:", parsed.subject); // Subject
                console.log("Text Body:", parsed.text); // Plain text body
                console.log("HTML Body:", parsed.html); // HTML body, if any
            })
            .catch(err => {
                console.error("Error parsing email:", err);
            })
            .finally(() => {
                cb(); // Signal that processing is complete
            });
    }
});

// Start the server on port 25
server.listen(25, () => console.log("SMTP server is listening on port 25"));
