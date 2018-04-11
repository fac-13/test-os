BEGIN;

DROP TABLE IF EXISTS users, comments, destinations CASCADE;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password CHAR(64) NOT NULL,
    member_since TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE destinations (
    id BIGSERIAL PRIMARY KEY,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL
);

CREATE TABLE comments (
    comment TEXT NOT NULL,
    userid BIGINT REFERENCES users(id),
    destid BIGINT REFERENCES destinations(id),
    PRIMARY KEY (userid, destid) 
);

COMMIT;
