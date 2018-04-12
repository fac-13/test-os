const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const check_destination_exists = require('../queries/check_destinations');
const register_destination = require('../queries/register_destination');
const get_destination_id = require('../queries/get_destination_id');
const register_comment = require('../queries/register_comment');

const { log } = console;

const loginHandler = (req, res) => {
  log('login handler')
}

const signUpHandler = (req, res) => {
  log('sign up handler')
}

function getUserId() {
  return 1;
}

function getDestinationId(country, city, cb) {
  check_destination_exists(city,(err, res) => {
    if(err) {
      cb(err);
    } else {
      // if city, country exists -> get it
      // else insert city, country in destination table
      if(res[0].case === false) {
          // add destination to database
          register_destination(country, city, (err, dbRes) => {
            if (err) cb(err);
            get_destination_id(city, (err, res) => {
              if (err) cb(err);
              else cb(null, res[0].id);
            });
          });
      } else {
        // get destination id
        get_destination_id(city, (err, res) => {
          if (err) cb(err);
          else cb(null, res[0].id);
        });
      }
    }
  });
}

const addCommentHandler = (req, res) => {
  let data = '';
    req.on('data', function(chunk){
      data += chunk;
    });

    req.on('end',() =>{
      const { country, city, comment } = qs.parse(data);
      // get user id from cookie
      const userId = getUserId();
      //get destinations id from destinations


      getDestinationId(country, city, (err, destId) => {
        log('destid', destId)
        register_comment(comment, userId, destId, (err, dbRes) => {
          if (err) {
            log(err)
            res.writeHead(401, {'location': '/public/comment.html'});
            res.end('you have already made a comment');
          } else {
            // add is comment is sucessfull
            res.writeHead(302, {'location': '/public/comment.html'})
            res.end();
          }
        })
      });
      // insert into commentsTable
      //comment text
    })
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

  let basePath = path.join(__dirname, '..');
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
  fs.readFile(path.join(__dirname, 'data', 'countries.min.json'), (err, file) => {
    if (err) {
      resResourceError(res)
    } else {
      const obj = JSON.parse(file);
      const listOfCountries = Object.keys(obj);
      if (groupName === 'country') {
        res200(res, JSON.stringify(listOfCountries), 'application/json');
      } else {
        const country = req.url.split('&')[1].replace('%20', ' ');
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
  listHandler,
  addCommentHandler
}