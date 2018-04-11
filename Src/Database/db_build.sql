BEGIN;

DROP TABLE IF EXISTS users, comments, destinations CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password CHAR(64) NOT NULL,
    member_since TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL
);

CREATE TABLE comments (
    comment TEXT NOT NULL,
    userid INTEGER REFERENCES users(id),
    destid INTEGER REFERENCES destinations(id),
    PRIMARY KEY (userid, destid) 
);

COMMIT;