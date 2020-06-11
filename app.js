const express = require('express'),
    bodyParser = require('body-parser'),
    Rest = require('./routes/Rest'),
    path = require('path'),
    cors = require('cors'),
    search = require('./routes/Search'),
    ImageRouter = require('./routes/image'),
    port = process.env.PORT || 8888,
    router = express.Router(),
    app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(express.static(path.join(__dirname, "./uploads")));
app.set("view engine", "ejs")

var myhome = [
    {
        id: 0,
        name: "chayanon",
        tel: "0954321078",
        description: "คำอธิบาย",

        latitude: 56,
        longitude: 23,

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

        latitude: 56,
        longitude: 23,

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

        latitude: 56,
        longitude: 23,

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

        latitude: 56,
        longitude: 23,

        price: 5000, //บาท
        area: 100, //หน่วยตารางเมตร
        type: "sale", // sale/rent
        category: "condo" // condo/house
    }
]

var my_home = []
app.get('/', (req, res) => {
    res.send('/home <br/>')
})

app.use('/upload', ImageRouter)
app.use('/api', Rest)
app.use('/search', search)



app.use("*", (req, res) => res.status(404).send("404 not found"))
app.listen(port, () => {
    console.log("server is running");

})
