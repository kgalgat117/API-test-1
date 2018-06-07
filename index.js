var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/API-test-1');


var newDataSchema = new mongoose.Schema({
    ename: {
        type: String,
        unique: true
    },
    oname: String,
    location: String,
    date: Date,
});

var newData = mongoose.model('newData', newDataSchema);

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set("view engine", "ejs")

app.get('/view/:name', function (req, res) {
    var name = req.params.name;
    newData.find({
        ename: name
    }, function (err, datas) {
        if (err) {
            console.log(err)
        } else {
            res.render('view', {
                datas: datas
            });
        }
    })
});

app.get('/', function (req, res) {
    newData.find({}, function (err, datas) {
        if (err) {
            console.log(err);
        } else {
            res.render('home', {
                datas: datas
            });
        }
    });
});

app.get('/register',function(req,res){
    res.render('register');
});

app.post('/register', function (req, res) {
    var entry = new newData({
        ename: req.body.ename,
        date: req.body.date,
        oname: req.body.oname,
        location: req.body.location
    });
    entry.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("saved");
        }
    })
    res.redirect('/viewall');
});


app.get('/viewall', function (req, res) {
    newData.find({}, function (err, datas) {
        if (err) {
            console.log(err);
        } else {
            res.render('viewall', {
                datas: datas
            });
        }
    });

});


app.listen(3000);
