const express             = require("express");
const session            = require("express-session");
const MySQLStore         = require("express-mysql-session")(session);
const bkfd2Password      = require("pbkdf2-password");

const app = express();

app.use(session({
    secret: "23423456325659562@!@#!@#",
    resave: true,
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

const hasher = bkfd2Password();
let users = [];

/* LOGIN */
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
            <a href="/auth/register">Register</a>
        </form>
    `;
    res.send(output);
});

app.post("/auth/login", (req, res) => {
    let uname = req.body.username;
    let pwd = req.body.password;
    
    for(let i=0 ; i<users.length ; i++){
        let user = users[i];
        if(uname === user.username){
            return hasher({password: pwd, salt: user.salt}, (err, pass, salt, hash) => {
                if(hash == user.password){
                    req.session.displayName = user.displayName;
                    req.session.save(() => {
                        res.redirect("/welcome");
                    });
                }else{
                    res.send("Who are you? <a href='/auth/login'>Login</a>");
                }
            });
        }
    }
    res.send("Who are you? <a href='/auth/login'>Login</a>");
});

/* LOGOUT */
app.get("/auth/logout", (req, res) => {
    delete req.session.displayName;
    req.session.save(() => {
        res.redirect("/welcome");
    });
});

/* REGISTER */
app.get("/auth/register", (req, res) => {
    let output = `
        <h1>Register</h1>
        <form action="/auth/register" method="POST">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="displayName" name="displayName" placeholder="displayName">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
    res.send(output);
});

app.post("/auth/register", (req, res) => {
    hasher({password: req.body.password}, (err, pass, salt, hash) => {
        let user = {
            username: req.body.username,
            password: hash,
            salt: salt,
            displayName: req.body.displayName
        };
        users.push(user);
        req.session.displayName = req.body.displayName;
        req.session.save(() => {
            res.redirect("/welcome");
        });
    });
});

/* WELCOME */
app.get("/welcome", (req, res) => {
    if(req.session.displayName){
        res.send(`
            <h1>Hello ${req.session.displayName}</h1>
            <a href="/auth/logout">Logout</a>
        `);
    } else {
        res.send(`
            <h1>Unsigned User</h1>
            <ul>
                <li>
                    <a href="/auth/login">Login</a>
                </li>
                <li>
                    <a href="/auth/register">Register</a>
                </li>
            </ul>
        `);
    }
});

app.listen(5000, console.log("Running on 5000 Port"));