BEGIN;

DROP TABLE IF EXISTS users, comments, destinations CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password CHAR(64) NOT NULL,
    member_since TIMESTAMPTZ NOT NULL NOW()
);

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL
);

CREATE TABLE comments (
    comment TEXT NOT NULL,
    userid INT,
    destid INT,
    FOREIGN KEY destid REFERENCES destinations(id),
    FOREIGN KEY userid REFERENCES users(id),
    PRIMARY KEY (userid, destid) 
);

COMMIT;