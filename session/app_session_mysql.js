const express     = require("express");
const session     = require("express-session");
const MySQLStore  = require("express-mysql-session")(session);

const app = express();
app.use(session({
    secret: "23423456325659562@!@#!@#",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: "localhost",
        port: 3306,
        user: "aejin",
        password: "1224",
        database: "session_test"
    })
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/auth/logout", (req, res) => {
    delete req.session.displayName;
    res.session.save(() => { //데이터 store의 저장이 끝났을 때 인자로 전달한 함수를 콜백함수를 나중에 호출한다
        res.redirect("/welcome");
    });
});

app.get("/welcome", (req, res) => {
    if(req.session.displayName){
        res.send(`
            <h1>Hello ${req.session.displayName}</h1>
            <a href="/auth/logout">Logout</a>
        `);
    } else {
        res.send(`
            <h1>Welcome</h1>
            <a href="/auth/login">Login</a>
        `);
    }
});

app.post("/auth/login", (req, res) => {
    let user = {
        username: "aejin",
        password: "1224",
        displayName: "AJ"
    };
    let uname = req.body.username;
    let pwd = req.body.password;
    
    if(uname === user.username && pwd === user.password){
        req.session.displayName = user.displayName;
        req.session.save(() => {
            res.redirect("/welcome");
        })
    }
    else res.send("Who are you? <a href='/auth/login'>Login</a>")
});

app.get("/auth/login", (req, res) => {
    let output = `
        <h1>Login</h1>
        <form action="/auth/login" method="POST">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
    res.send(output);
});

app.listen(5000, console.log("Running on 5000 Port"));