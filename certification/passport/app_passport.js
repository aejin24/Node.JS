const express            = require("express");
const session            = require("express-session");
const MySQLStore         = require("express-mysql-session")(session);
const bkfd2Password      = require("pbkdf2-password");
const passport           = require("passport");
const LocalStrategy      = require("passport-local").Strategy;

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
app.use(passport.initialize());
app.use(passport.session());

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
        </form>
    `;
    res.send(output);
});

passport.serializeUser((user, done) => { //user에는 username, password, salt, displayName이 담겨있음
    console.log("serializeUser", user);
    done(null, user.username);
});

passport.deserializeUser((id, done) => { //이미 접속 이력이 있던 user가 재접속할 때 실행되는 함수
    console.log("deserializeUser", id);
    for(let i=0 ; i<users.length ; i++){
        let user = users[i];
        if(user.username === id){
            done(null, user);
        }
    }
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        let uname = username;
        let pwd = password;
        
        for(let i=0 ; i<users.length ; i++){
            let user = users[i];
            if(uname === user.username){
                return hasher({password: pwd, salt: user.salt}, (err, pass, salt, hash) => {
                    if(hash == user.password){
                        console.log("LocalStrategy", user);
                        done(null, user); //passport.serializeUser 실행
                    }else{
                        done(null, false, {message: "Incorrect password"});
                    }
                });
            }
        }
        done(null, false, {message: "Invalid User"});
    }
));

app.post(
    "/auth/login",
    passport.authenticate("local", {
        successRedirect: "/welcome",
        failureRedirect: "/auth/login",
        failureFlash: false //인증 실패 정보를 주고 싶을 때 쓰는 기법으로 사용자에게 딱 한번만 메시지를 보여줄 수 있다
    })
)

/* LOGOUT */
app.get("/auth/logout", (req, res) => {
    req.logOut();
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
        req.login(user, (err) => {
            req.session.save(() => {
                res.redirect("/welcome");
            });
        });
    });
});

/* WELCOME */
app.get("/welcome", (req, res) => {
    if(req.user && req.user.displayName){
        res.send(`
            <h1>Hello ${req.user.displayName}</h1>
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