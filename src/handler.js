const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const check_user_exists = require('../queries/check_username');
const check_user_password = require('../queries/check_user_password');
const bcrypt = require("bcryptjs");
const { log } = console;
const secret = process.env.secret;



const loginHandler = (req, res) => {
  let data = '';
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end',() => {
    const info = qs.parse(data);
    const username = info.username;
    const password = info.password;

    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
    console.log(err);
    } else {
    console.log("hash: ", hash); } }); });

    check_user_exists(username, (err,resUserExists) => {
      if (err) console.log(err)
      // else console.log(res[Object.keys(res)[0]]);
      else {
        const boolean = resUserExists[0].case; 
        if (boolean === true) {

        check_user_password(username, (err, resPassword) => {
          // console.log(res);
          if(err){
            res.writeHead(500, {'Content-Type':'text/html'});
            res.end("<h1> Can't log in at this time</h1>");
          } else {

          bcrypt.compare(password, resPassword, (err,resBcrypt) => {
            console.log("password is ", password);
            console.log("res password ", resPassword);
            console.log(resBcrypt);
            if (err) {
            res.writeHead(500, {'Content-Type':'text/html'});
            res.end("<h1>Something went wrong with our server</h1>");
            } else {
              if (resBcrypt === false) {
              res.writeHead(401, {'Content-Type':'text/html'});
              res.end("<h1>Incorrect password</h1>");
              } else {
              res.writeHead(200, {'Content-Type':'text/html'});
              res.end("<h1>Success</h1>");
                }
              }
            });
            }
          });
        }  
      }
    });
  });
};

const signUpHandler = (req, res) => {

};


const resResourceError = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Sorry Page Not Found');
};

const res200 = (res, resource, contentType) => {
  res.writeHead(200, { 'Content-Type': `${contentType}` });
  res.end(resource);
};

const staticHandler = (req, res) => {
  const { url } = req;

  let basePath = path.resolve('./'); // path to start with root of project
  let resource = url.replace(/^(\.+[/\\])+/, ''); // removes all ./ and ../

  if (url === '/' || url === '/index.html') {
    basePath = path.resolve('./public');
    resource = '/index.html';
  }

  const ext = resource.split('.')[1];
  const contentType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon'
  }[ext];

  const filePath = path.join(basePath, resource);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      resResourceError(res);
    } else {
      res200(res, file, contentType);
    }
  });
};


const listHandler = (req, res) => {
  const groupName = req.url.split('=')[1];
  log(groupName)
  fs.readFile(path.join(__dirname, 'data', 'countries.min.json'), (err, file) => {
    if (err) {
      resResourceError(res)
    } else {
      const obj = JSON.parse(file);
      const listOfCountries = Object.keys(obj);
      if (groupName === 'country') {
        res200(res, JSON.stringify(listOfCountries), 'application/json');
      } else {
        log('get cities list');
        const country = req.url.split('&')[1].replace('%20', ' ');
        log(country);
        if (listOfCountries.includes(country)) {
          const cites = obj[country];
          res200(res, JSON.stringify(cites), 'application/json');
        }

      }
      
    }

  })
}
module.exports = {
  staticHandler,
  signUpHandler,
  loginHandler,
  listHandler
}
