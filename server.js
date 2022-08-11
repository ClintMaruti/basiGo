const express = require("express");
const server = express();
const path = require("path");
const { pool } = require("./db/config");
require("dotenv").config();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passport-config");

initializePassport(passport);
const PORT = process.env.PORT || 4000;

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
server.use(session({ secret: "BASIGO", resave: false, saveUninitialized: false }));
server.use(flash());

server.get("/", (req, res) => {
    res.render("index");
});

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.get("/users/login", (req, res) => {
    res.render("login-page");
});

server.get("/users/signup", (req, res) => {
    res.render("signup");
});

server.get("/users/dashboard", (req, res) => {
    res.render("dashboard", { user: req.user.user_name });
});

server.post(
    "/users/login",
    passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    }),
    async (req, res) => {
        let { email, password } = req.body;

        let errors = [];

        if (!email || !password) {
            errors.push({ message: "Please enter all fields" });
        }

        if (errors.length > 0) {
            res.render("login-page", { errors });
        } else {
            // Form validation
            // let hashedPass = await bcrypt.hash(password);

            // query database
            pool.query(`SELECT * FROM users WHERE user_email = $1`, [email], (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);

                if (results.rows.length > 0) {
                    res.render("dashboard");
                } else {
                    errors.push({ message: "Invalid Login Credentials try again" });
                    req.flash("unauthorized", "unauthorized user");
                    res.redirect("/users/login");
                }
            });
        }
        // console.log(email, password);
    }
);

server.post("/", (req, res) => {
    let { user_email, password } = req.body;
    console.log(user_email, password);
});

server.listen(PORT, () => {
    console.debug(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
