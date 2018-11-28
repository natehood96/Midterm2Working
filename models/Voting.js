var mongoose = require('mongoose');

var VotingSchemaObj = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Votes: Number
});

VotingSchemaObj.methods.upvote = function(cb) {
  this.Votes += 1;
  this.save(cb);
};

mongoose.model('Voting',VotingSchemaObj);
