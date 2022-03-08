import express, { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config({path: __dirname + "/.env"});

const PORT: string | number = process.env.PORT || 3000;
const app = express();

// app.use 안에 있는 모든 함수들은 미들웨어임
// app.use((req: Request, res: Response, next: NextFunction) => {
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    req.requestTime = new Date().toString();
    console.log("before render");
    next(); // 바로 다음 미들웨어 실행
    // next("route"); // 바로 다음 미들웨어를 실행하는 것이 아닌 다음 라우터로 바로 이동한다
}, (req: Request, res: Response, next: NextFunction) => { // 연달아서 사용 가능하다
    console.log("before render22");
    next();
    // next(Error); // "route" 이외의 것을 넣는다면 아래에 작성된 미들웨어는 무시가 되고 에러처리 미들웨어로 이동하게 된다
}, (req: Request, res: Response, next: NextFunction) => {
    console.log("after render");
    res.send(req.requestTime);
});

app.use(((err, req, res, next) => { // error 미들웨어는 반드시 4개를 다 써야한다 (시그니처)
    res.status(500).send("에러 처리 미들웨어");
}) as ErrorRequestHandler);

app.listen(PORT, () => console.log("Running on TS-Express Server\n"))
    .on("error", (err) => { throw new Error(`${err.name}: ${err.message}`) });