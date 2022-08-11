require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER ?? "postgres"}:${process.env.DB_PASSWORD ?? "postgres"}@${process.env.DB_HOST ?? localhost}:${process.env.DB_PORT ?? 5432}/${process.env.DB_DATABASE ?? `basigo`}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});

module.exports = { pool };
