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

INSERT INTO users(username, password) VALUES ('johndoe', 'password1'), ('joedummy', 'password2'), ('joecopy', 'password3');

INSERT INTO destinations(country , city) VALUES ('United Kingdom', 'London'), ('United Kingdom', 'Southampton'), ('Cyprus', 'Nicosia');

INSERT INTO comments(comment, userid, destid) VALUES ('Great distination. Will visit again', 1, 1), ('Boring city. Not sure if I like it', 2, 2), ('So hot. Avoid in summer', 3, 3);

COMMIT;
