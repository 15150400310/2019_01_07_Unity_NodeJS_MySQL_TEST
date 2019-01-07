var mysql = require('mysql')
//var express = require('express')
//var ejs = require('ejs')
//var app = express()

var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

server.listen(3306)


//app.set('view engine','ejs')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'wowowo',
    database:'unity_sql'
})
connection.connect()


app.get('/',function(req,res){
    res.send('hey you got back get "/"')
})

io.on('connection',function(socket){
    console.log('client connection')

    var currentPlayer = {}
    currentPlayer.name = 'unkown'

    socket.on('zhuce',function(){
        console.log(currentPlayer.name+'recv: zhuce ')
        for(var i = 0;i<clients.length;i++){
            var playerConnected={
                name:clients[i].name,
                position:clients[i].position,
                rotation:clients[i].position,
                health:clients[i].health
            }
            socket.emit('other player connected',playerConnected)
            console.log(currentPlayer.name+'emit: other player connected '+JSON.stringify(playerConnected))
        }
        var id = req.params.id
        var pword = req.params.pword
        var time = new Date()
        connection.query(
            "insert into todolist value('" +id+ " ',' "+name+" ',' "+time.toLocaleDateString()+"')",
            function(err,result,fields){
                res.json(result)
            }
        )
    })

    
})


// app.get('/list',function(req,res){
//     connection.query(
//         'select * from student',
//         function(err,rows,fields){
//             if(err){
//                 throw err
//             }
//             console.log(rows)
//             res.json(rows)
//         }
//     )
// })


app.get('/students',function(req,res){
    connection.query(
        'select * from student',
        function(err,rows,fields){
            res.render('list',{rows:rows})
        }
    )
})
app.get('/del/:id',function(req,res){
    var id = req.params.id
    connection.query(
        "delete from student where sno = '" + id + "'",
        function(err,result,fields){
            res.json(result)
        }
    )
})
app.get('/bye',function(req,res){
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

app.listen(8000,function(){
    console.log("server is running at localhost:8000")
})
//connection.end()