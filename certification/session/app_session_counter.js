const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
    secret: "23423456325659562@!@#!@#",
    resave: false,
    saveUninitialized: true 
}));

app.get("/count", (req, res) => {
    if(req.session.count) req.session.count++;
    else req.session.count = 1;
    res.send("count: " + req.session.count);
});

app.listen(5000, console.log("Running on 5000 Port"));