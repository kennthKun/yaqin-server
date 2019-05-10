var express = require('express');
var app = express();
var mysql      = require('mysql');
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');
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
	var  sql = 'SELECT * FROM Place';
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

app.post('/login', function (req, res) {
	//查
	var data = ''
	var dataObject = {}
	var  sql = ''
	req.on('data', function (chunk) {
		data += chunk;
	});
	 req.on('end', function () {
	   data = decodeURI(data);
	   dataObject = querystring.parse(data);
     console.log(dataObject.username);
     var  sql = 'SELECT password FROM user WHERE username="'+dataObject.username+'";';
     connection.query(sql,function (err, result) {
			if(err) {
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			console.log(result[0]);
			if(result[0].password && result[0].password == dataObject.password){
				var data = {
					"code": 0,
					"data": '登录成功！'
				}
			}else{
				var data = {
					"code": 1,
					"data": '用户名或密码错误！'
				}
			}
			res.send(data);
			}); 
	 });
})

app.post('/registered', function (req, res) {
	//注册
	var data = ''
	var dataObject = {}
	var  sql = ''
	req.on('data', function (chunk) {
		data += chunk;
	});
	req.on('end', function () {
		data = decodeURI(data);
	  dataObject = querystring.parse(data);
    var  addSqlParams =dataObject.data.split(',');
    var  addSql = 'INSERT INTO user(username,password) VALUES(?,?)';
		console.log(addSqlParams)
		connection.query(addSql,addSqlParams,function (err, result) {
			if(err){
	    			console.log('[INSERT ERROR] - ',err.message);
	        	return;
	     }   
	     var data = {
				"code": 0,
				"data": '注册成功！'
			}
	     console.log(result);
	     res.send(data);
		})
     
	 });
})

app.get('/delete',function(req,res){
	//删
	console.log(req.query.id)
	var delSql = 'DELETE FROM Place where id=1';
	connection.query(delSql,function (err, result) {
		if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
     }   
     console.log(result);
	})
	res.send("ok");
})


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 localhost:", host, port)
})
