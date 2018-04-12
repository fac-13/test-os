const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const { log } = console;

const loginHandler = (req, res) => {
  log('login handler')
}

const signUpHandler = (req, res) => {
  log('sign up handler')
}


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