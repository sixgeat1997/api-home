var fs = require('fs');
var path = require('path');
var multer = require('multer');
var imgModel = require('../model/Image');
var express = require('express')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var imgmongo = express.Router()

var upload = multer({ storage: storage });

imgmongo.get('/mk', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ items: items });
        }
    });
})
imgmongo.post('/mk', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save(); 
            // res.redirect('/');
            res.send('ok')
        }
    });
});

module.exports = imgmongo