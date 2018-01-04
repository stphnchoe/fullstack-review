const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let usernameOptions = require('../helpers/github.js');
let db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  usernameOptions.getReposByUsername(req.body.username, function(data) {
      db.save(data, function() {
        res.end();
      });
  });
    
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  console.log('here');
  db.find(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      res.json(data);  
    }
  })
  // This route should send back the top 25 repos
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

