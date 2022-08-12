require("dotenv").config();
const path = require("path");
const fs = require("fs");
let sql = fs.readFileSync(path.join(__dirname, "/basigoDb.sql")).toString();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

// const connectionString = process.env.DATABASE_URL;

const connectionString = `postgresql://${process.env.DB_USER ?? "postgres"}:${process.env.DB_PASSWORD ?? "postgres"}@${process.env.DB_HOST ?? localhost}:${process.env.DB_PORT ?? 5432}/${process.env.DB_DATABASE ?? `basigo`}`;

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
