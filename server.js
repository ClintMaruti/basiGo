const express = require("express");
const server = express();
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passport-config");
initializePassport(passport);
const PORT = process.env.PORT || 4000;

require("dotenv").config();

// routers
const router = require("./routes");

// Middlewares
server.use(express.static("public"));
server.use(
    session({
        // Key we want to keep secret which will encrypt all of our information
        secret: process.env.SESSION_SECRET ?? "basigo",
        // Should we resave our session variables if nothing has changes which we dont
        resave: false,
        // Save empty value if there is no vaue which we do not want to do
        saveUninitialized: false,
    })
);
server.use(passport.session());
server.use(passport.initialize());
server.use(express.urlencoded({ extended: false }));
server.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
server.use(flash());
server.use(router);

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.listen(PORT, () => {
    console.debug(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
