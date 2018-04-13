const { staticHandler, signUpHandler, loginHandler, listHandler, addCommentHandler, getComments } = require('./handler')


const router = (request, response) => {
  const { url } = request;
  if (request.method === "GET") {
    if (url.includes('list')) {
      listHandler(request, response);
    } else if (url.includes('comments')){
      getComments(request,response); 
    } else {
      staticHandler(request, response);
    }
  } else if(request.method === "POST") {
    if (url.includes('signup')) {
      signUpHandler(request, response)
    } else if (url.includes('login')) {
      loginHandler(request, response)
    } else if (url.includes('add-comment')) {
      addCommentHandler(request, response);
    }

  }
};

module.exports = router;
