const express = require("express");
const app = express();

app.locals.pretty = true;
app.use(express.static("public"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
    res.send("Hello home page");
});

app.get("/dynamic", (req, res) => {
    var lis = "";
    for (var i = 0 ; i < 5 ; i++) {
        lis += "<li>coding</li>";
    }

    var time = Date();

    var output = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        Hello, Static
        <ul>
          ${lis}
        </ul>
        ${time}
      </body>
    </html>
    `;

    res.send(output);
});

app.get("/route", (req, res) => {
    res.send("Hello Router, <img src='/cat.png'>")
});

app.get("/login", (req, res) => {
    res.send("<h1>Login please</h1>");
});

app.get("/static", (req, res) => {
    res.render("static.html", {
        name: "aejin",
        age: "24"
    })
});

app.listen(3000, () => {
    console.log("Connected 3000 port");
});