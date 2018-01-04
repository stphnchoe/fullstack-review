const request = require('request-promise');
const config = require('../config.js');
let db = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    json: true
  };
  request(options)
    .then(function(body) {
      body.forEach((item) => {
        db.save({
          id: item.id,
          name: item.name,
          username:  item.owner.login,
          description: item.description || '',
          url: item.html_url,
          stargazers_count: item.stargazers_count
        })
      });
    })
    .catch(function(err) {
      console.error(err)
    });
}

module.exports.getReposByUsername = getReposByUsername;