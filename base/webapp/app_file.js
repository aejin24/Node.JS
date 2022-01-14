const express = require("express");
const fs = require("fs");
const app = express();

app.set("views", __dirname + "/views_file");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/topic/new", function(req, res){
    fs.readdir(__dirname + "/data/", function(err, files){
        if (err) res.status(500).send("Internal Server Error");

        res.render("new.html", {topics: files});
    })
});

app.post("/topic", function(req, res){
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile(__dirname + "/data/" + title, description, function(err){
        if (err) res.status(500).send("Internal Server Error");

        res.redirect("/topic/" + title);
    });
});

app.get(["/topic", "/topic/:id"], function(req, res){
    var id = req.params.id;

    fs.readdir(__dirname + "/data/", function(err, files){
        if (err) res.status(500).send("Internal Server Error");

        if (id) {
            fs.readFile(__dirname + "/data/" + id, "utf-8", function(err, data){
                if (err) res.status(500).send("Internal Server Error");
        
                res.render("view.html", {topics: files, title: id, description: data});
            })
        } else {
            res.render("view.html", {topics: files, title: "Welcome", description: "Hello, JavaScript"});
        }
    });
});

app.listen(3000, function(){
    console.log("Connected, 3000 port!");
});