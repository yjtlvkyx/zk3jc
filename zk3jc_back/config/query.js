/*
 * @Author: 闫江涛 
 * @Date: 2018-12-16 19:43:59 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-12-16 19:43:59 
 */




let express = require("express"),
    mysql = require("mysql"),
    config = require("./config");
console.log(config)


//创建链接池
let connection = mysql.createPool(config);

module.exports = function(sql, query, fn) {
    fn = fn ? fn : query;
    query = query ? query : [];
    connection.getConnection((err, connect) => {
        if (err) {
            fn(err);
        } else {
            connect.query(sql, query, (err, results) => {
                connect.release();
                callbackFn(err, results)
            })
        }
    })

    function callbackFn(err, results) {
        if (err) {
            fn(err);
        } else {
            fn(null, results)
        }
    }
}