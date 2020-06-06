const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const helpers = require('./helpers');
const port = process.env.PORT || 8888;
const app = express()
const router = express.Router()
// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');

const server = 'http://localhost:8888'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }), router)
// app.use(express.static(path.join(__dirname, "./uploads")));
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
    limits: { fileSize: 5000000 },
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
}).single('file')

router.route('/')
    .get((req, res) => {
        res.send('1234')
    })

app.get('/photo/:path', (req, res) => {
    return res.sendFile(req.params.path, { root: "upload/" });
})
app.post('/photo', (req, res) => {
    upload(req, res, err => {
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
})



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
