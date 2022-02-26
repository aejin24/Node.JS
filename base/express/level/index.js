// application level (개발자 만든 미들웨어)
import express from "express";

const app = express();

//모든 get 방식에서만 log를 찍는 미들웨어
app.get("/*", (req, res, next) => {
    console.log("global get method log");
    
    // 밑에 next를 추가적으로 수행하지 않고 바로 라우터로 이동하고 싶을 때
    next("route");
    // next();
}, (req, res, next) => {
    console.log("global 2 middleware");
    next();
});

// 특정 path에만 global 로그를 찍기 ex) "/a"
app.get("/a", (req, res, next) => {
    console.log("a middleware");
    next();
});

app.get("/b", (req, res, next) => { // error를 던져주기 위한 next
    console.log("b router");
    next(error);
});

app.get("/a", (req, res) => {
    console.log("a router");
});

// error level
app.use("/b", (err, req, res, next) => { // error
    res.status(500).send("Something Broken");
})


app.listen(3000, () => console.log("Running on 3000"));