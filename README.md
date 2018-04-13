# test-os | FAC Week 7 Project

A web app where you can write a comment on a place you have visited

## How to install

Clone repo and go to project directory
```bash
$ git clone https://github.com/fac-13/test-os.git
$ cd test-os
```

Use `npm` to install dependencies
```bash
$ npm i
```

Create a `.env` file and add environment variables for postgres database connection, `DB_URL` and `TEST_DB_URL`
```bash
$ touch .env
```

`.env` should look like:
```
DB_URL = postgres://[username]:[password]@localhost:5432/[database name]
TEST_DB_URL = postgres://[username]:[password]@localhost:5432/[test database name]
```

Build database with build script
```bash
$ npm run build-db
```

Then run the server
```bash
$ npm start
```
or, to watch for changes in source code and run server
```bash
$ npm run dev
```

To run tests
```bash
$ npm test
```

## Project requirements

[Schema | Draw io](https://drive.google.com/file/d/1EzhKn-oz3NsOeeWwmXlARvr_zXtd_my_/view?usp=sharing)

## User Stories
- You can see comments about destinations without being signed in. But you can only post if you are signed in.

- When a user arrives on page they can see all the destinations with comments with the total count of comments

- A user can sign up where they will be taken to a new page with a sign up form

- The sign up form will contain:
  - username
  - password (password must contain at least one capital letter, number and special character)
  - confirm password

- The login form will contain:
  - username
  - password

- In the nav bar there will be a button that lets a user sign up or login
  - The nav bar will be on every page and know it a user is logged in, with their username and a logout button.
  - When the user is logged in the nav bar will have button to let the user add comment about a destination

- When the user wants to add a comment they will be taken to a new page with a form containing:
  - country
  - city
  - comment
  - We will use [all-countries-and-cities-json](https://github.com/meMo-Minsk/all-countries-and-cities-json) by github user **meMo-Minsk** to make a drop-down list of cites 

- When the user logs out they will be redirected to the home page
- If a user is logged in they cannot signup or log in.
- If a user is not logged in they will not see the logout button and cannot comment

### Stretch Goals

- a user to be able to reply to a comment

## Queries we will need

- For landing page
  - List of existing destinations

- During sign up
  - Check if username is already taken
  - Assuming client side validation works, insert to users table username and hashed password

- During log in
  - Get hashed password for user

- When making a comment
  - Get destination ID
  - Get user Id
  - Insert comment into the comments table

## day 1

- Set up database
  - create `db_connection.js`
  - create `build_db.js` and `build_db.sql`

- create database queries
  - listing all destinations for landing page
  - checking if username is taken and inserting a new user for sign up
  - getting hashed password to verify log in
  - getting destination and user id to insert into comments table when making a comment

- client sign up validation
  - password must be over 8 characters long and contain at least one number# Week 7 Project

## day 2

- sign up
  - protect from script injection in the inputs
  - sever validation
  - store hashed password

- log in
  - server validation
  - issuing a cookie

- finish validations from login and sign up


- insert initial data to `db_build.sql`

- enter comment
  - client form with drop-down list of inputs
    - use json file from [here](https://github.com/meMo-Minsk/all-countries-and-cities-json)
  - server route will be protected to only allow logged in users
  - insert comment into db