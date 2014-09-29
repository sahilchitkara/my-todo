var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/get', function (req, res) {
    Task.find({userId: req.user._id}, function (err, tasks) {
        if (err) res.send({status: 500, data: err});
        else {
            res.send({status: 200, data: tasks});
        }
    });
});

router.get('/get/:id', function (req, res) {
    Task.findOne({_id: req.param('id')}, function (err, task) {
        if (err) res.send({status: 500, data: err});
        else if (!task) {
            res.send({status: 204, data: "Not Found"})
        }
        else {
            res.send({status: 200, data: task});
        }
    });
});

router.post('/update/:id', function (req, res) {
    Task.findOneAndUpdate({_id: req.param('id')}, {$set: req.body}, function (err, task) {
        if (err) res.send({status: 500, data: err});
        else if (!task) {
            res.send({status: 204, data: "Not Found"})
        }
        else {
            res.send({status: 200, data: task});
        }
    });
});

router.put('/create', function (req, res) {
    var task = new Task({
        title: req.param('title'),
        description: req.param('description'),
        timeStampCreated: +new Date(),
        dueDate: req.param('dueDate'),
        status: req.param('status'),
        userId:req.user._id
    });
    task.save(function (err, task) {
        if (err) res.send({status: 500, data: err});
        else {
            res.send({status: 201, data: task});
        }
    });
});

router.delete('/delete/:id', function (req, res) {
    Task.remove({_id: req.param('id')}, function (err, deleted) {
        if (err) res.send({status: 500, data: err});
        else {
            res.send({status: 200, data: {deleted: true}});
        }
    })
});

module.exports = router;