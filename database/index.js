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

let save = (data) => {
  // TODO: Your code here
  let userRepo = new Repo(data);
  userRepo.save();
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
module.exports.find = find;