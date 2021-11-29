const fs = require("fs");
const httpStatusCodes = require("http-status-codes");

const subRouterProcessing = (subRouter) => {
    subRouter.get("/", (req, res) => {
        fs.readFile("router/client/sub/index.html", null, (error, data) => {
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

module.exports.subRouterProcessing = subRouterProcessing;