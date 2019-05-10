var express = require('express');
var app = express();
var mysql = require('mysql');
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');
var connection = mysql.createConnection({
	host: '39.107.83.69',
	user: 'root',
	password: 'ck970524',
	port: '3306',
	database: 'yaqin'
});
connection.connect();
app.all("*", function(req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if(req.method.toLowerCase() == 'options')
		res.send(200); //让options尝试请求快速结束
	else
		next();
})
//查导游
app.get('/guides/api', function(req, res) {
	var sql = 'SELECT * FROM tour_guides';
	connection.query(sql, function(err, result) {
		if(err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		result.code = 0
		console.log(result);
		var data = {
			"code": 0,
			"data": result
		}
		res.send(data);
	});
})

app.get('/guides/delete', function(req, res) {
	//删
	console.log(req.query.id)
	var delSql = 'DELETE FROM tour_guides where id='+req.query.id;
	connection.query(delSql, function(err, result) {
		if(err) {
			console.log('[INSERT ERROR] - ', err.message);
			return;
		}
		var data = {
			"code": 0,
			"data": result
		}
		res.send(data);
	})
	
})

//加导游
app.post('/addTourGuide', function (req, res) {
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
    var  addSql = 'INSERT INTO tour_guides(name,phone,introduce,scenic_spot,category,price) VALUES(?,?,?,?,?,?)';
		console.log(addSqlParams)
		connection.query(addSql,addSqlParams,function (err, result) {
			if(err){
	    			console.log('[INSERT ERROR] - ',err.message);
	        	return;
	     }   
	     var data = {
				"code": 0,
				"data": 'ok！'
			}
	     console.log(result);
	     res.send(data);
		})
     
	 });
})

//----------------------------------------------------------------------------------------------------------------------------------------------

//查询景区
app.get('/scenic_spot_second/api', function(req, res) {
	var sql = 'SELECT * FROM scenic_spot_second';
	connection.query(sql, function(err, result) {
		if(err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		result.code = 0
		console.log(result);
		var data = {
			"code": 0,
			"data": result
		}
		res.send(data);
	});
})

//加景区
app.post('/scenic_spot_second/add', function (req, res) {
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
    var  addSql = 'INSERT INTO scenic_spot_second(name,level,address,category,sum_start_time,sum_end_time,winter_start_time,winter_end_time,price,introduce) VALUES(?,?,?,?,?,?,?,?,?,?)';
		console.log(addSqlParams)
		connection.query(addSql,addSqlParams,function (err, result) {
			if(err){
	    			console.log('[INSERT ERROR] - ',err.message);
	        	return;
	     }   
	     var data = {
				"code": 0,
				"data": 'ok！'
			}
	     console.log(result);
	     res.send(data);
		})
     
	 });
})

//删除景区
app.get('/scenic_spot_second/delete', function(req, res) {
	//删
	console.log(req.query.id)
	var delSql = 'DELETE FROM scenic_spot_second where id='+req.query.id;
	connection.query(delSql, function(err, result) {
		if(err) {
			console.log('[INSERT ERROR] - ', err.message);
			return;
		}
		var data = {
			"code": 0,
			"data": result
		}
		res.send(data);
	})
	
})

//景区编辑
app.post('/scenic_spot_second/edit', function (req, res) {
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
//	  console.log(dataObject)
    var addSqlParams =dataObject.data;
    console.log(JSON.parse(addSqlParams))
    var tex = ''
    for (let x in  JSON.parse(addSqlParams)){
    		if(x == "longimageList" || x == "attractions"||x == "id"){
    			
    		}else{
    			tex +=", `"+x+"` = '"+JSON.parse(addSqlParams)[x]+"'"
    		}
    }
    tex = tex.substr(1)
    var updataSql = "UPDATE scenic_spot_second SET "+ tex +" WHERE `id` = "+JSON.parse(addSqlParams).id
		console.log(updataSql)
		connection.query(updataSql,function (err, result) {
			if(err){
	    			console.log('[INSERT ERROR] - ',err.message);
	        	return;
	     }   
	     var data = {
				"code": 0,
				"data": result
			}
	     console.log(result);
	     res.send(data);
		})
     
	 });
})

	//登录
app.post('/user/login', function(req, res) {
	var data = ''
	var dataObject = {}
	var sql = ''
	req.on('data', function(chunk) {
		console.log(chunk)
		data = chunk;
		data = decodeURI(data);
		dataObject = querystring.parse(data);
		if(dataObject.username == "admin"){
			var sql = 'SELECT password FROM user WHERE username="admin";';
			connection.query(sql, function(err, result) {
				if(err) {
					console.log('[SELECT ERROR] - ', err.message);
					return;
				}
				console.log(result[0]);
				if(result[0].password && result[0].password == dataObject.password) {
					var data = {
						"code": 20000,
						"data": 'admin-token'
					}
				} else {
					var data = {
						"code": 1,
						"data": '用户名或密码错误！'
					}
				}
				res.send(data);
			});
		}else{
			var data = {
				"code": 1,
				"data": '请输入管理员账户！'
			}
			res.send(data);
		}
		
		
		
	});
	req.on('end', function() {
		
		
	});
})

var server = app.listen(3002, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 localhost:", host, port)
})