var express = require('express');
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '39.107.83.69',
    user     : 'root',
    password : 'ck970524',
    port: '3306',
    database : 'yaqin'
}); 
connection.connect();
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

 
app.get('/api', function (req, res) {
	//查
	var  sql = 'SELECT * FROM jrrz';
	connection.query(sql,function (err, result) {
	    if(err){
	        console.log('[SELECT ERROR] - ',err.message);
	        return;
	    }
	    result.code = 0
	    console.log(result);
	    var data = {
	    		"code":0,
	    		"data":result
	    }
	    res.send(data);
	});   
})
app.get('/add',function(req,res){
	//增
	
	var  addSql = 'INSERT INTO jrrz(name,idNumber,CertificateType,CertificateNumber) VALUES(?,?,?,?)';
	var  addSqlParams =req.query.arr.split(',')
	console.log(addSqlParams)
	connection.query(addSql,addSqlParams,function (err, result) {
		if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
     }   
     console.log(result);
	})
	res.send("ok");
})

//app.get('/delete',function(req,res){
//	//增
//	console.log(req.query.id)
//	var delSql = 'DELETE FROM Place where id=1';
//	connection.query(delSql,function (err, result) {
//		if(err){
//       console.log('[INSERT ERROR] - ',err.message);
//       return;
//   }   
//   console.log(result);
//	})
//	res.send("ok");
//})


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 localhost:", host, port)
})
