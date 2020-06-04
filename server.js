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

router.route('/')
    
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
app.listen(8888, () => {
    console.log("server is running");

})




