 DROP TABLE IF EXISTS users;

 CREATE TABLE IF NOT EXISTS users
( user_id BIGSERIAL PRIMARY KEY NOT NULL,
 user_name VARCHAR(200) NOT NULL,
 user_email VARCHAR(200) NOT NULL,
 isAdmin BOOLEAN,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 password VARCHAR(200) NOT NULL,
 CONSTRAINT email_unique UNIQUE (user_email)
);

 DROP TABLE IF EXISTS leads;

CREATE TABLE IF NOT EXISTS leads (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	firstName VARCHAR(200) NOT NULL,
	secondName VARCHAR(200) NOT NULL,
	phoneNumber VARCHAR(200) NOT NULL,
	location VARCHAR(200) NOT NULL,
	gender VARCHAR(10) CHECK (gender in ('Female','Male')),
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	createdBy VARCHAR(200) NOT NULL
);

 DROP TABLE IF EXISTS customer;

CREATE TABLE IF NOT EXISTS customer (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	firstName VARCHAR(200) NOT NULL,
	secondName VARCHAR(200) NOT NULL,
	phoneNumber VARCHAR(200) NOT NULL,
	location VARCHAR(200) NOT NULL,
	gender VARCHAR(10) CHECK (gender in ('Female','Male')),
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	createdBy VARCHAR(200) NOT NULL,
	photo BYTEA,
	earnings VARCHAR(200) NOT NULL,
	product VARCHAR(200) NOT NULL
);


INSERT INTO users (user_name, user_email, password, isAdmin)
VALUES ('client', 'client@basigo.com', 'client', False);

INSERT INTO users (user_name, user_email, password, isAdmin)
VALUES ('admin', 'admin@basigo.com', 'admin', True);

INSERT INTO users (user_name, user_email, password, isAdmin)
VALUES ('basigo', 'bus@basigo.com', 'basigo', True);