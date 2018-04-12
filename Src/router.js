const { staticHandler, signUpHandler, loginHandler, listHandler } = require('./handler')


const router = (request, response) => {
  const { url } = request;
  if (request.method === "GET") {
    console.log(url)
    if (url.includes('list')) {
      listHandler(request, response);
    } else {
      staticHandler(request, response);
    }
  } else if(request.method === "POST") {
    if (url.includes('signup')) {
      signUpHandler(request, response)
    } else if (url.includes('login')) {
      loginHandler(request, response)
    }

  }
};

module.exports = router;