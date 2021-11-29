const express = require("express");
const fs = require("fs");
const httpStatusCodes = require("http-status-codes");

const router = express.Router();
const mainRouter = express.Router();
const subRouter = express.Router();

const rMain = require("./main");
const rSub = require("./sub");

rMain.mainRouter(mainRouter);
rSub.subRouter(subRouter);

router.use("/", mainRouter);
router.use("/sub", subRouter);
router.get("*", (req,res) => {
    fs.readFile("router/client/404.html", null, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(
                httpStatusCodes.StatusCodes.OK,
                {
                    "Content-Length": Buffer.byteLength(data),
                    "Content-Type": "text/html; charset=utf-8"
                }
            );
            res.write(data);
            res.end();
        }
    });
});

module.exports = router;