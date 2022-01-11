const express = require("express");
const app = express();

app.locals.pretty = true; // 페이지 소스보기 눌렀을 때 형식에 맞춰 출력하게 해주는 속성
app.use(express.static("public")); //정적 파일들이 들어있는 디렉토리를 사용할 수 있도록 설정한다

app.set("view engine", "jade");
// app.set("views", "./views"); express는 기본적으로 views를 설정할 때 views directory를 바라보도록 되어있기 때문에 생략 가능하다


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
    res.send("Hello Router, <img src='/cat.png'>") //정적인 파일은 수정을 해도 서버를 내렸다가 다시 올릴 필요가 없음
});

app.get("/login", (req, res) => {
    res.send("<h1>Login please</h1>");
});

app.get("/template", (req, res) => {
    res.render("temp", {time: Date(), _title: "Jade Study"});
});

app.listen(3000, () => {
    console.log("Connected 3000 port");
});

/**
 * 사용자      Router           Controller
 * /           .get("/")        send("Hello home page")
 * /login      .get("/login")   send("login please")
 */