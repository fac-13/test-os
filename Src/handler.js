const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const check_user_exists = require('../Queries/check_username')

const { log } = console;

const loginHandler = (req, res) => {
  let data = '';
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end',() =>{
    const info = qs.parse(data);
    check_user_exists(info.username, (err,res) => {
      var stringify = JSON.stringify(res[0])
      if (err) console.log(err)
      // else console.log(res[Object.keys(res)[0]]);
      else {
        console.log(res[0]);
        console.log(typeof res[0]);
        console.log(res[0].case);


      }
    });
    res.writeHead(302,{
    'location': "/Public/login.html"})
    res.end();
  })
}

const signUpHandler = (req, res) => {
  log('sign up handler')
}


const resResourceError = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Sorry Page Not Found');
};

const res200 = (res, file, contentType) => {
  res.writeHead(200, { 'Content-Type': `${contentType}` });
  res.end(file);
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

module.exports = {
  staticHandler,
  signUpHandler,
  loginHandler,
}
