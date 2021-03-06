const express = require('express');
const router = express.Router();

router.get('/', function(request, response) {
  if (request.session.loggedin) {
    response.send('Welcome back, ' + request.session.username + '!');
  } else {
    response.send('Please login to view this page!');
  }
  response.end();
});
module.exports = router;