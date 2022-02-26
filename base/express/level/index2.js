import express from "express";

const app = express();

// 모든 path가 요청이 오기 전에 제일 먼저 실행되는 역할 -> app.use
// 이런 경우 불필요한 경우에도 실행될 수 있음
// 해결법: app.METHOD((req ...)) 이런 방식으로 사용해야한다
app.use((req, res, next) => {
    console.log("this is middleware!");
    next();
});

app.get('/', (req, res) => {
    console.log("root")
    res.send(req.message);
});

app.get('/a', (req, res) => {
    console.log("a")
    res.send(req.message);
});

app.listen(3000, () => console.log("Running on 3000"));