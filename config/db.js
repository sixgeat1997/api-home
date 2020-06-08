const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
})

db.connect((err) => {
    if (err) throw err
    else
        console.log('connected as id ' + db.threadId);

})

module.exports = db