const { Router } = require("express");
const router = Router();
const { pool } = require("./db/config");
const passport = require("passport");
const initializePassport = require("./passport-config");
initializePassport(passport);
const { checkAuthenticated, checkNotAuthenticated } = require("./utils");

/**
 * Get Routes
 */
// GET /index
router.get("/", (req, res) => {
    res.redirect("/users/login");
});
// GET /login
router.get("/users/login", checkAuthenticated, (req, res) => {
    res.render("login-page");
});
// GET /dashboard
router.get("/users/dashboard", checkNotAuthenticated, async (req, res) => {
    // Fetch all leads and customers from the database if a lead is in the customer table
    // remove it from the list to be displayed in the leads page
    let error = [];
    pool.query(`SELECT * FROM leads`, (err, results) => {
        if (err) {
            throw err;
        }
        if (results.rows.length > 0) {
            if (req.user.isadmin) {
                res.render("leads", { user: req.user.user_name, isAdmin: req.user.isadmin, leads: results.rows });
            } else {
                res.render("add-lead", { user: req.user.user_name, isAdmin: req.user.isadmin });
            }
        } else {
            error.push({ message: "No Leads Available at the moment." });
            req.flash("No leads available at the moment");
            if (req.user.isadmin) {
                res.render("leads", { user: req.user.user_name, isAdmin: req.user.isadmin, error: error });
            } else {
                res.render("add-lead", { user: req.user.user_name, isAdmin: req.user.isadmin });
            }
        }
    });
});
// GET /logout
router.get("/users/dashboard/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return err;
        }
        res.redirect("/");
    });
    req.flash("success_msg", "You have logged out");
});
// GET /add leads
router.get("/users/dashboard/add-leads", checkNotAuthenticated, (req, res) => {
    res.render("add-lead", { user: req.user.user_name, isAdmin: req.user.isadmin });
});
// GET /add customer
router.get("/users/dashboard/add-customer/:id", checkNotAuthenticated, async (req, res) => {
    // fetch lead from the database
    let error = [];
    pool.query(`SELECT * FROM leads WHERE id = $1`, [req.params.id], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.rows.length > 0) {
            res.render("create-customer", { user: req.user.user_name, isAdmin: req.user.isadmin, lead: results.rows[0] });
        } else {
            error.push({ message: "No Leads Available at the moment." });
            req.flash("No leads available at the moment");
            res.render("create-customer", { user: req.user.user_name, isAdmin: req.user.isadmin, error: error });
        }
    });
});

/**
 * POST Routes
 */
// POST /login
router.post(
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
// POST /Add Leads
router.post("/users/dashboard/add-lead", async (req, res) => {
    let { fName, sName, phone, location, gender, created_by } = req.body;

    let errors = [];
    // shallow validation check
    if (!fName || !sName || !location || !gender || !created_by) {
        errors.push({ message: "Make sure you fill all the missing fields" });
    }

    // query database
    pool.query(`INSERT INTO leads (firstname, secondname, phonenumber, location, gender, createdby) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [fName, sName, phone, location, gender, created_by], (err, result) => {
        if (err) {
            throw err;
        }

        console.log(result.rows);
        req.flash("success_msg", "You have successfully added leads into the database");
        res.redirect("/users/dashboard/add-leads");
    });
});
// POST /Create customer
router.post("/users/dashboard/add-customer", async (req, res) => {
    let { fName, sName, phone, location, gender, photo, earnings, product, created_by } = req.body;
    let errors = [];
    // shallow validation check
    if (!fName || !sName || !location || !gender || !created_by || !earnings || !product) {
        errors.push({ message: "Make sure you fill all the missing fields" });
    }

    // query database
    pool.query(`INSERT INTO customer (firstname, secondname, phonenumber, location, gender, createdby, photo, earnings, product) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [fName, sName, phone, location, gender, created_by, photo, earnings, product], (err, result) => {
        if (err) {
            throw err;
        }

        console.log(result.rows);
        req.flash("success_msg", "You have successfully added leads into the database");
        res.redirect("/users/dashboard");
    });
});

module.exports = router;
