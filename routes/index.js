module.exports = function(io){
    
var express = require('express');
var router = express.Router();
var passport = require('passport') ; 
    
var book = require('../models/book') ; 
var cat = require('../models/category') ; 
var Account = require('../models/account') ; 

router.get('/', function(req, res, next) {
     book.find({}).populate('category').exec(function(err, books){
        res.render('index.twig', {books : books});
});
});
    
    // lors d'appui sur le btn 
    router.get('/acheter/:id', function(req, res, next) {
        book.findOne({"_id" : req.params.id}).exec(function(err,livre){
            if(err){
                console.log(err)  ; 
            }else{
                 io.emit('status',new Date().toDateString() + "emprunt" + livre.name ) ; 
            }
        })
       
     
});
    
    router.get('/login' , function(req,res,next){
        res.render('login.twig') ; 
    }) ; 
        
    router.post('/login', passport.authenticate('local', { successRedirect: '/books',
  failureRedirect: '/login',
  }));
    
    router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});


//    router.get('/register' , function(req,res,next){
//        res.render('login.twig') ; 
//    })
//    
//    router.post('/register', function(req, res, next) {
//    Account.register(new Account({ username : req.body.username}), req.body.password, function(err, account) {
//        if (err) {
//          //return res.render('register.twig', {info: "Sorry. That username already exists. Try again."});
//		  res.send(401);
//        }
//
//        passport.authenticate('local')(req, res, function () {
//            req.session.save(function (err) {
//                if (err) {
//                    return next(err);
//                }
//                //res.redirect('/final');
//				res.send(req.user);
//            });
//        });
//    });
//});



return router;
    
} ; 