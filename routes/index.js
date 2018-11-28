var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VotingSchemaObj = mongoose.model('Voting');


router.param('candidate', function(req, res, next, id) {
  var query = VotingSchemaObj.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error("can't find candidate")); }
    req.candidate = candidate;
    return next();
  });
});

router.get('voting/:candidate', function(req, res){
  console.log('voting/:candidate route')
  res.json(req.candidate);
});

router.put('/voting/:candidate/upvote', function(req, res, next) {
  console.log("Put Route "+req.candidate.Name);
  req.candidate.upvote(function(err, candidate){
    if (err) { return next(err); }
    res.json(candidate);
  });
});


router.delete('/voting/:candidate',function(req,res) {
  req.candidate.remove();
  res.sendStatus(200);
});

router.get('/voting', function(req, res, next) {
  console.log("Get Route");
  VotingSchemaObj.find(function(err, candidates){
    if(err){ console.log("Error"); return next(err); }
    res.json(candidates);
  console.log("res.json Get Route");
  });
  console.log("returningGet Route");
});

router.post('/voting', function(req, res, next) {
  console.log("Post Route");
  var candidate = new VotingSchemaObj(req.body);
  console.log("Post Route");
  console.log(candidate);
  candidate.save(function(err, candidate){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(candidate);
	});
});


// /* GET comments from database */
// router.get('/voting', function(req, res, next) {
//     console.log("request query", req.query.name);
//     var name = req.query.name;
    
//     if(name) //anything exists in the name field
//     {
//         VotingSchemaObj.find({Name : req.query.name}, function(err,votingList) { //Calls the find() method on your database
//       if (err) return console.error(err); //If there's an error, print it out
//       else {
//         console.log(votingList); //Otherwise console log the comments you found
//         res.json(votingList); //Then send the comments
//       }
//     })
//     }
//     else{
//     console.log("In the GET route?");
//     VotingSchemaObj.find(function(err,votingList) { //Calls the find() method on your database
//       if (err) return console.error(err); //If there's an error, print it out
//       else {
//         console.log(votingList); //Otherwise console log the comments you found
//         res.json(votingList); //Then send the comments
//       }
//     })
//     }
// });


// router.get('/voting/',function(req,res) {
//   res.json(req.candidate);
// });

// router.delete('/voting/:candidate',function(req,res) {
//   req.candidate.remove();
//   res.sendStatus(200);
// });

// // router.delete('/voting', function(req, res, next) {
// //   VotingSchemaObj.find({}).remove(function(err, votingList) {
// //         if (err) return console.error(err); //If there's an error, print it out
// //          else {
// //             res.sendStatus(200);
// //           }
// //   });
// //});
   
   
// //   router.get('/comment', function(req, res, next) {
// //     console.log("In the GET route?");
// //     Comment.find(function(err,commentList) { //Calls the find() method on your database
// //       if (err) return console.error(err); //If there's an error, print it out
// //       else {
// //         console.log(commentList); //Otherwise console log the comments you found
// //         res.json(commentList); //Then send the comments
// //       }
// //     })
// // });


module.exports = router;
