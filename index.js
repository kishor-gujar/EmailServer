const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    
    onConnect(session, cb){
        console.log("OnConnect", session.id)
        cb();
    },

    onMailFrom(addpress, session, cb) {
        console.log("OnMailFrom", addpress.address, session.id)
        cb();
    },

    onRcptTo(addpress, session, cb) {
        console.log("OnRcptTo", addpress.address, session.id);
    },

    onData(stream, session, cb){
        stream.on('data', (data) => {
            console.log('OnData', data.toString())
            stream.on('end', cb)
        });
    }
})

server.listen(25, () => console.log("server is listening on : 25"))