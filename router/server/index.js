const express = require("express");
const http = require("http");

const rMain = require("./router/mainRouter");
const rSub = require("./router/subRouter");

const app = express();
const port = process.env.PORT || 8080;
const httpServer = http.createServer(app);

const mainRouter = express.Router();
const subRouter = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(mainRouter);
app.use("/sub", subRouter);

rMain.mainRouterProcessing(mainRouter);
rSub.subRouterProcessing(subRouter);

httpServer.listen(port, "0.0.0.0", () => {
    console.log(`Running on Port ${port}`); 
});