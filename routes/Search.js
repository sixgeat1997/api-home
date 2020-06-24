const express = require('express'),
    search = express.Router(),
    db = require('../config/db')

var my_home = []



search.route('/price')
    .get((req, res) => {

        const { fPrice, ePrice } = { ...req.body }
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
                if (item.price >= fPrice && item.price <= ePrice)
                    return item
            })
            res.json(pass)

        })



    })


search.route('/location')
    .get((req, res) => {
        const { latitude, longitude } = { ...req.body }
        let sqlget = ' SELECT * FROM tbl_home '
        db.query(sqlget, (error, results, fields) => {
            // เกิด error ในคำสั่ง sql
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            my_home = results

            var BETWEEN_DEGREE = 15;
            var THOUSAND_METER = 1000;

            /**
             * define surface distance per 1 degree change
             */
            var SURFACE_DISTANCE_PER_ONE_DEGREE = [
                { latitude: 110.574, longitude: 111.320 }, //0  degree
                { latitude: 110.649, longitude: 107.551 }, //15 degree
                { latitude: 110.852, longitude: 96.486 },  //30 degree
                { latitude: 111.132, longitude: 78.847 },  //45 degree
                { latitude: 111.412, longitude: 55.800 },  //60 degree  
                { latitude: 111.618, longitude: 28.902 },  //75 degree
                { latitude: 111.694, longitude: 0.000 }    //90 degree
            ];

            /**
             * define class GPS for keep latitude and longitude
             */
            var GPS = function (lat, lnt) {
                this.latitude = lat || 0;
                this.longitude = lnt || 0;
            };

            function getSurfaceDistance(gps) {
                return SURFACE_DISTANCE_PER_ONE_DEGREE[parseInt(gps.latitude / BETWEEN_DEGREE)]; //depend on latitude
            }

            function getLatitudeDistance(gps) {
                return getSurfaceDistance(gps).latitude * THOUSAND_METER;
            }

            function getLongitudeDistance(gps) {
                return getSurfaceDistance(gps).longitude * THOUSAND_METER;
            }

            function findDistance(gps1, gps2) {

                var latitudeDistance1 = getLatitudeDistance(gps1); //a1
                var latitudeDistance2 = getLatitudeDistance(gps2); //a2

                var longitudeDistance1 = getLongitudeDistance(gps1); //b1
                var longitudeDistance2 = getLongitudeDistance(gps2); //b2

                // (X2 * a2 - X1 * a1) ^ 2
                var power1 = Math.pow((gps2.latitude * latitudeDistance2) - (gps1.latitude * latitudeDistance1), 2);
                // (Y2 * b2 - Y1 * b1) ^ 2
                var power2 = Math.pow((gps2.longitude * longitudeDistance2) - (gps1.longitude * longitudeDistance1), 2);

                return Math.sqrt(power1 + power2);
            };

            var distance = 0

            const x = my_home.filter((item) => {
                var gps1 = new GPS(+latitude, +longitude);
                var gps2 = new GPS(+item.latitude, +item.longitude);


                distance = findDistance(gps1, gps2)
                console.log(distance);

                if (distance < 10000)
                    return item
                // nearby.push(item)
            })
            console.log(x);
            // res.send(distance)

            res.send(x)



        })



    })

module.exports = search

