require("dotenv").config();
const path = require("path");
const fs = require("fs");
let sql = fs.readFileSync(path.join(__dirname, "/basigoDb.sql")).toString();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
});

pool.query(sql, (err, results) => {
    if (err) {
        throw err;
    }
    console.log("🚀  Database Updated Successfully!");
});

module.exports = { pool };
