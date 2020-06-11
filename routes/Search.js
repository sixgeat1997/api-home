const express = require('express'),
    search = express.Router(),
    db = require('../config/db')

var my_home = []

search.route('/price')
    .get((req, res) => {

        const { price, end } = { ...req.body }
        let sqlget = ' SELECT * FROM tbl_home '

        // console.log(price + "" + end);


        db.query(sqlget, (error, results, fields) => {
            // เกิด error ในคำสั่ง sql
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            my_home = results

            const pass = my_home.filter((item) => {
                if (item.price >= price && item.price <= end)
                    return item
            })
            res.json(pass)

        })



    })

search.route('/category')
    .get((req, res) => {
        let sqlget = ' SELECT * FROM tbl_home '
        const category = req.body.category
        console.log(category);

        db.query(sqlget, (error, results, fields) => {
            // เกิด error ในคำสั่ง sql
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            my_home = results

            const pass = my_home.filter((item) => {
                if (item.category == category)
                    return item
            })
            console.log(pass);
            res.json(pass)

        })

    })

module.exports = search

