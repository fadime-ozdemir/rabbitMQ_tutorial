const express = require('express');
const app = express();
const publisher = require('./publisher.js');

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
    // send html
    res.sendFile(__dirname + "/index.html");
});

app.get("/message", async (req, res) => {
    res.sendFile(__dirname + "/message.html");
});

app.post("/message", function (req, res, next) {
    // post 
    publisher(req.body.message);
    next();
}, (req, res) => res.redirect("/"));

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App listening at ${port}`)
});
