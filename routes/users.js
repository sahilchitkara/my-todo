var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        req.login(req.user,function(err,success){
        });
        res.send({status: 200, data: {success: true}});
    }, function (req, res) {
        res.send({status: 404, data: {success: false}})
    });

router.get('/currentUser', function (req, res) {
    if(req.user){
        res.send({status:200,data:req.user});
    }else{
        res.send({status:404,data:null})
    }
});

router.get('/logout', function (req, res) {
    req.user=null;
    req.logout();
    res.redirect('/');
})
module.exports = router;
