var express = require('express');
var router = express.Router();
var book = require('../models/book') ;
var cat = require('../models/category') ;

router.get('/', function(req, res, next) {
     book.find({}).populate('category').exec(function(err, books){
        res.render('books/index.twig', {books : books});
});
});


router.get('/addBook', function(req, res, next) {
    cat.find({}).exec(function(err,cat){
         res.render('books/create.twig',{cat : cat}) ;
    }) ;

});

router.post('/addBook', function(req, res, next) {
    var b = new book({name: req.body.name,
                                author: req.body.author,
                                publication_year: req.body.publication_year,
                                description: req.body.description,
                                category: req.body.category,
                             });
    b.save(function(err, c){
        res.redirect('/books');
    });
});

router.get('/:id' , function(req,res,next){
    book.remove({"_id":req.params.id}).exec(function(err,f){
        if(err){
            console.log(err) ;
        }
        else{
            res.redirect('/books') ;
        }
    }) ;

}) ;

router.get('/editBook/:id', function(req, res, next) {
     book.findOne({"_id":req.params.id}).exec(function(err, books){
         if(err){
             res.send(err) ;
         }else{
             cat.find({}).exec(function(err,cats){
                 res.render('books/edit.twig', {books : books,cats:cats});
             }) ;

         }
});
});

router.post('/editBook/:id' , function(req,res,next){
    book.findOneAndUpdate({"_id":req.params.id}, {$set : {

                          "name": req.body.name,
                                "author": req.body.author,
                                "publication_year": req.body.publication_year,
                                "description": req.body.description,
                                "category": req.body.category


                          }}).exec(function(err,pb){
        if(err){
            console.log(err) ;
        }
        else{
            res.redirect('/books') ;
        }
    });
});


module.exports = router;
