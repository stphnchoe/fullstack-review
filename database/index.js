const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, index:true, unique: true},
  name: String,
  username:  String,
  description: String,
  url: String,
  stargazers_count: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let find = (callback) => {
  Repo.find({})
  .sort({'stargazers_count': -1})
  .limit(25)
  .exec(function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      if (callback) {
        callback(null, data);
      }
    }
  });

  
}

let save = (data, callback) => {
  // TODO: Your code here
  data.forEach((item) => {
    let userRepo = new Repo({
            id: item.id,
            name: item.name,
            username:  item.owner.login,
            description: item.description || '',
            url: item.html_url,
            stargazers_count: item.stargazers_count
          });
    userRepo.save();
  })
  callback();
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
module.exports.find = find;