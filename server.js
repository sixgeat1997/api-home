const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const helpers = require('./helpers');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs')
const methodOverride = require('method-override');
const port = process.env.PORT || 8888;
const app = express()
const router = express.Router()

const server = 'http://localhost:8888'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(express.static(__dirname + '/uploads'));
app.set("view engine", "ejs")

const myhome = [
    {
        id: 0,
        name: "chayanon",
        tel: "0954321078",
        description: "คำอธิบาย",
        location: {
            latitude: 56,
            longitude: 23
        },
        price: 5000, //บาท
        area: 100, //หน่วยตารางเมตร
        type: "sale", // sale/rent
        category: "condo" // condo/house
    },
    {
        id: 1,
        name: "chayanon",
        tel: "0954321078",
        description: "คำอธิบาย",
        location: {
            latitude: 56,
            longitude: 23
        },
        price: 5000, //บาท
        area: 100, //หน่วยตารางเมตร
        type: "sale", // sale/rent
        category: "condo" // condo/house
    },
    {
        id: 2,
        name: "chayanon",
        tel: "0954321078",
        description: "คำอธิบาย",
        location: {
            latitude: 56,
            longitude: 23
        },
        price: 5000, //บาท
        area: 100, //หน่วยตารางเมตร
        type: "sale", // sale/rent
        category: "condo" // condo/house
    },
    {
        id: 3,
        name: "chayanon",
        tel: "0954321078",
        description: "คำอธิบาย",
        location: {
            latitude: 56,
            longitude: 23
        },
        price: 5000, //บาท
        area: 100, //หน่วยตารางเมตร
        type: "sale", // sale/rent
        category: "condo" // condo/house
    },
]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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
// checkFileType = (file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb("images only");
//     }
// };

// let uploader = multer({
//     storage,
//     limits: { fileSize: 9000000 },
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     }
// }).single("file");
app.post('/upload-multiple-images', (req, res) => {
    // 10 is the limit I've defined for number of uploaded files at once
    // 'multiple_images' is the name of our file input field
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('multiple_images', 10);

    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        // else if (...) // The same as when uploading single images

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="./">Upload more images</a>';
        res.send(result);
    });
});
app.post('/upload-profile-pic', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});
router.route('/upload')
    .post((req, res) => {
        uploader(req, res, err => {
            if (err) res.json({ message: "error", details: err });
            else {
                if (req.file == undefined) {
                    res.json({ message: "error", details: "no file selected" });
                } else {
                    res.json({
                        message: "file uploaded",
                        url: `${server}/upload/${req.file.filename}`
                    });
                }
            }
        });
    });

router.route('/')
    .get((req, res) => {
        // res.render('home');
        // res.send('<h1> /home --> get,post <Br/> /edit --> delete,put </h1><a href="https://api-home.sixgeat1997.now.sh/home" >home</a> ')
        res.render('index')
    });

router.route('/home')
    .get((req, res) => {
        res.json(myhome)
    })
    .post((req, res) => {
        // console.log(req.body);
        var keephome = {}
        keephome.id = myhome.length > 0 ? myhome[myhome.length - 1].id + 1 : 0
        keephome.name = req.body.name
        keephome.description = req.body.description
        keephome.location = req.body.location
        keephome.price = req.body.price
        keephome.area = req.body.area
        keephome.type = req.body.type
        keephome.category = req.body.category
        keephome.tel = req.body.tel
        myhome.push(keephome)
        res.json({ message: "success" })
    })

router.route('/edit/:id')
    .delete((req, res) => {
        var index = myhome.findIndex(p => +p.id === +req.params.id)
        myhome.splice(index, 1)
        res.json({ message: "delete" })
    })
    .put((req, res) => {
        var index = myhome.findIndex(p => +p.id === +req.params.id)
        myhome[index].name = req.body.name
        myhome[index].description = req.body.description
        myhome[index].location = req.body.location
        myhome[index].price = req.body.price
        myhome[index].area = req.body.area
        myhome[index].type = req.body.type
        myhome[index].category = req.body.category
        myhome[index].tel = req.body.tel
        res.json({ message: "update" })

    })


app.use("*", (req, res) => res.status(404).send("404 not found"))
app.listen(port, () => {
    console.log("server is running");

})

// router.route('/upload', upload.single('file'))
//     .post((req, res) => {
//         // const price = req.params
//         // res.redirect('/')
//         res.json({ file: req.file })
//     })




// const mongoURL = "mongodb+srv://homedb:home1234@cluster0-z2nit.mongodb.net/goodhome"
// //create mongo connection
// const con = mongoose.createConnection(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// let gfs

// con.once('open', () => {
//     gfs = Grid(con.db, mongoose.mongo);
//     gfs.collection('homelist.chunks');
//     // gfs = new mongoose.mongo.GridFSBucket(con.db, {
//     //     bucketName: "listhouse"
//     // });
//     // gfs = Grid(con.db, new mongoose.mongo.GridFSBucket(con.db, {
//     //     bucketName: "listhouse"
//     // }));
//     // gfs.collection('listhouse');
//     // gfs.
// })

// const storage = new GridFsStorage({
//     url: mongoURL,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = Date.now() + "_" + file.originalname.split(" ").join().replace(",", "_")
//                 // const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: "homelist.chunks"
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// const upload = multer({
//     storage
// })



// app.get('/', (req, res) => {
//     if (!gfs) {
//         console.log("some error occured, check connection to db");
//         res.send("some error occured, check connection to db");
//         process.exit(0);
//     }


//     gfs.chunks.find().toArray((err, files) => {
//         // Check if files
//         if (!files || files.length === 0) {
//             res.render('home', { files: false });
//         } else {
//             files.map(file => {
//                 if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//                     file.isImage = true;
//                 }
//                 else {
//                     file.isImage = false;
//                 }
//             });
//             // console.log(files);

//             res.render('home', { files: files });   
//             console.log(gfs.chunks);

//         }
//     });
// });

// app.post('/upload', upload.single('file'), (req, res) => {
//     // res.json({ file: req.file })
//     res.redirect('/')


// })
