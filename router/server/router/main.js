const fs = require("fs");
const httpStatusCodes = require("http-status-codes");

const clientPath = "router/client/";

const mainRouter = (mainRouter) => {
    mainRouter.get("/", (req, res) => {
        fs.readFile(clientPath + "index.html", null, (error, data) => {
            if (error){
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
}

module.exports.mainRouter = mainRouter;