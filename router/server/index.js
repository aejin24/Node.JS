const express = require("express");
const http = require("http");

const app = express();
const port = process.env.PORT || 5000;
const httpServer = http.createServer(app);

const routes = require("./router");

app.use(express.urlencoded({ extended: true }));
app.use(routes);

httpServer.listen(port, "127.0.0.1", () => {
    console.log(`Running on Port ${port}`); 
});