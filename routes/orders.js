var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('orders.twig') ; 
});

module.exports = router;
