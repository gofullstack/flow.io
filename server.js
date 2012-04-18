var Session = require("flowdock").Session,
    io = require("socket.io").listen(4000);

io.sockets.on("connection", function (socket) {
    socket.on("auth", function (data) {
        var session = new Session(data.username, data.password),
            stream = session.stream(data.subdomain + "/" + data.flow);

        stream.on("message", function (data) { console.log(data);socket.emit("message", data); });
        stream.on("error", function (data) { console.error(data);socket.emit("error", data); });
    });
});
