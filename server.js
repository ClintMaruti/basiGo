const express = require("express");
const server = express();
const path = require("path");

const PORT = process.env.PORT || 4000;

server.use(express.static("public"));

server.get("/", (req, res) => {
    res.render("index");
});

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.get("/users/login", (req, res) => {
    res.render("login");
});

server.get("/users/signup", (req, res) => {
    res.render("signup");
});

server.get("/users/dashboard", (req, res) => {
    res.render("dashboard", { user: "Clint" });
});

server.listen(PORT, () => {
    console.debug(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
