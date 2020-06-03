const exprese = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = exprese()
const router = exprese.Router()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }), router)

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

router.route('/gethome')
    .get((req, res) => {
        res.json(myhome)
    })


app.use("*", (req, res) => res.status(404).send("404 not found"))
app.listen(8888, () => {
    console.log("server is running");

})




