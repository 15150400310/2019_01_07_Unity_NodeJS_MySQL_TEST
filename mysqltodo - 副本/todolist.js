var mysql = require('mysql')
var express = require('express')
var ejs = require('ejs')
var todo = express()
todo.set('view engine','ejs')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'wowowo',
    database:'db03'
})
connection.connect()

todo.get('/list',function(req,res){
    connection.query(
        'select * from todolist',
        function(err,rows,fields){
            if(err){
                throw err
            }
            console.log(rows)
            res.json(rows)
        }
    )
})
todo.get('/todolist',function(req,res){
    connection.query(
        'select * from todolist',
        function(err,rows,fields){
            res.render('todolist',{rows:rows})
        }
    )
})
todo.get('/del/:id',function(req,res){
    var id = req.params.id
    connection.query(
        "delete from todolist where id = '" + id + "'",
        function(err,result,fields){
            res.json(result)
        }
    )
})
todo.get('/get/:id',function(req,res){
    var id = req.params.id
    connection.query(
        "select * from todolist where id = '" + id + "'",
        function(err,result,fields){
            res.json(result)
        }
    )
})
todo.get('/update/:id/:name',function(req,res){
    var id = req.params.id
    var name = req.params.name
    var time = new Date()
    connection.query(
        "update todolist set eventname = '" + name + "'" + ",eventtime = '"+time.toLocaleDateString()+"'" + "where id = '" + id +"'",
        function(err,result,fields){
            res.json(result)
        }
    )
})
todo.get('/add/:id/:name',function(req,res){
    var id = req.params.id
    var name = req.params.name
    var time = new Date()
    connection.query(
        "insert into todolist value('" +id+ " ',' "+name+" ',' "+time.toLocaleDateString()+"')",
        function(err,result,fields){
            res.json(result)
        }
    )
})
todo.get('/bye',function(req,res){
    connection.end()
})

/*
connection.query(
    'select * from student',
    function(err,rows,fields){
        for(var index in rows){
            row = rows[index]
            console.log(row.sno,
                row.sname,
                row.sscore
            )
        }
    }
)
*/

/*
connection.query(
    "INSERT INTO student VALUES('006','li7','m',20,'smmt',98);",
    function(err,result,fields){
        console.log(result.insertId,result.affectedRows)
    }
)
*/

todo.listen(8000,function(){
    console.log("server is running at localhost:8000")
})
//connection.end()