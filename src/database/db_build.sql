BEGIN;

DROP TABLE IF EXISTS users, comments, destinations CASCADE;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(64) NOT NULL, -- YO!!!, MAKE SURE HASHED PASSWORDS ARE THIS TYPE!
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

CREATE UNIQUE INDEX username_unique_idx ON users(username);
CREATE INDEX password_idx ON users(password);

COMMIT;
