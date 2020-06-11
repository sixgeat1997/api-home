const express = require('express'),
    router = express.Router(),
    db = require('../config/db')

var my_home = []

router.route('/home')
    .get((req, res) => {
        let sqlget = ' SELECT * FROM tbl_home '

        db.query(sqlget, (error, results, fields) => {
            // เกิด error ในคำสั่ง sql
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            // แสดงข้อมูลกร๊ไม่เกิด error

            my_home = results

            console.log(my_home);
            return res.json(my_home)

        })
     


    })


    .post((req, res) => {
        // console.log(req.body);

        var h_id = my_home.length > 0 ? my_home[my_home.length - 1].h_id + 1 : 0


        let sqlpost = ' INSERT INTO tbl_home SET ? '
        db.query(sqlpost, { ...req.body, h_id: h_id }, (error, results, fields) => {
            console.log(error)
            if (error) {
                throw error
            }
            // console.log(results.insertId)
            // console.log(results)
            // console.log(fields)
            // res.json(results)
        })
        res.json({ message: "success" })
    })

router.route('/edit/:id')
    .delete((req, res) => {
        var index = my_home.findIndex(p => +p.id === +req.params.id)
        my_home.splice(index, 1)
        // res.json({ message: "delete" })
        let sql = ' DELETE FROM tbl_home WHERE id = ? '
        db.query(sql, [req.params.id], (error, results, fields) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            // ใช้ค่าข้อมูลถ้าค้นเจอ ก่อนลบ ส่งออกไป เป็นการบอกว่า รายการนี้คือรายการที่ถูกลบไปแล้ว
            const result = {
                "status": 200,
                "data": req.params.id
            }
            return res.json(result)
        })


    })
    .put((req, res) => {
        console.log(req.body);

        // var index = myhome.findIndex(p => +p.h_id === +req.params.id)
        // myhome[index].name = req.body.name
        // myhome[index].description = req.body.description
        // myhome[index].location = req.body.location
        // myhome[index].price = req.body.price
        // myhome[index].area = req.body.area
        // myhome[index].type = req.body.type
        // myhome[index].category = req.body.category
        // myhome[index].tel = req.body.tel

        let sql = ' UPDATE tbl_home SET ? WHERE h_id = ? '
        db.query(sql, [{ ...req.body }, +req.params.id], (error, results, fields) => {
            // เกิด error ในคำสั่ง sql
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            // ถ้ามีการแก้ไขค่าใหม่ 
            if (results.affectedRows > 0) {
                // เอาค่าฟิลด์ทีได้ทำการอัพเดท ไปอัพเดทกับข้อมูลทั้งหมด
                // user = Object.assign(res.user[0], user)
            } else { // มีการอัพเดท แต่เป็นค่าเดิม
                // user = res.user
            }
            // ส่งรายการข้อมูลที่อัพเทกลับไป
            const result = {
                "status": 200,
                // "data": user
            }
            return res.json({ ...req.body, id: req.params.id })
        })
        console.log({ ...req.body, id: req.params.id });
        res.json({ message: "update" })


    })


module.exports = router