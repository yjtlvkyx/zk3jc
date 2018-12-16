var express = require('express');
var router = express.Router();
let query = require("../config/query");
let sql = require("../config/sql.js")
    /* GET home page. */
    //查询表单
router.get('/userlist', function(req, res, next) {

    query(sql.SELECT_TABLE, [], (err, wras) => {
        if (err) {
            console.log(err, "错误报告")
        } else {
            res.send({ wras })
        }
    })
});

module.exports = router;