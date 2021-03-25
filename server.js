const express = require('express');
const app = express();
var publisher = require('./publisher.js');
var consumer = require('./consumer.js');
var path = require("path")

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
    // send html
    res.sendFile(__dirname + "/index.html");
});

app.get("/message", async (req, res, next) => {
    await consumer().then(res.send("deneme")).then(next())
}
);

app.post("/message", function (req, res, next) {
    // post 
    publisher(req.body.message);
    next();
}, (req, res) => res.redirect(req.path));

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App listening at ${port}`)
});
