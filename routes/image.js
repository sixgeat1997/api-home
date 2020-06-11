const path = require('path'),
    fs = require('fs'),
    multer = require('multer'),
    express = require('express'),
    ImageRouter = express.Router(),
    fileUpload = require('express-fileupload'),
    db = require('../config/db')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
            "_" +
            file.originalname
                .split(" ")
                .join()
                .replace(",", "_")
        );
    }
})


let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("images only");
        }
    }
}).array('file')

ImageRouter.route('/photo/:path')
    .get((req, res) => {
        // return res.sendFile(req.params.path, { root: "upload/" });
    })

ImageRouter.route('/photo')
    .post((req, res) => {
        // let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('file', 10);
        upload(req, res, function (err) {


            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }

            let result = []
            const files = req.files;
            let index, len;

            var sql = "INSERT INTO file_img SET ?"
            for (index = 0, len = files.length; index < len; ++index) {
                result.push(files[index])
                var newfiles = {
                    name: files[index].filename,
                    type: files[index].mimetype,
                    size: files[index].size,
                    // id: my_home.length > 0 ? my_home[my_home.length - 1].h_id + 1 : 0
                }

                db.query(sql, newfiles, function (err, result) {
                    console.log('inserted data');
                });

            }

            res.send(result);
            console.log(result);
        })



    })

module.exports = ImageRouter