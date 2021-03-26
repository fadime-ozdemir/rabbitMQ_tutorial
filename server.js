const express = require("express");
const app = express();
const publisher = require("./publisher.js");
const fetchAllDataFromMessageCollection = require("./database.js")
  .fetchAllDataFromMessageCollection;
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// const io = io.listen(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
  // send html
  res.sendFile(__dirname + "/index.html");
});

app.get("/message", async (req, res) => {
  res.sendFile(__dirname + "/message.html");
  fetchAllDataFromMessageCollection();
});

app.post(
  "/message",
  async function (req, res, next) {
    // post to rabbitMQ
    await publisher(req.body.message);
    next();
  },
  (req, res) => res.redirect("/")
);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on('chat message', (msg) => {
    console.log('socket - message: ' + msg);
    // io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, function () {
        console.log(`App listening at ${port}`)
    });

// http.listen(3000, () => {
//   console.log("listening on *:3000");
// });

// const port = process.env.PORT || 3000;
// app.listen(port, function () {
//     console.log(`App listening at ${port}`)
// });
