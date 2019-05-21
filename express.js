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

app.post('/comments/add', function (req, res) {
	var data = ''
	var dataObject = {}
	var  sql = ''
	req.on('data', function (chunk) {
		data += chunk;
	});
	req.on('end', function () {
		data = decodeURI(data);
	  dataObject = querystring.parse(data);
    var addSqlParams =dataObject.data;
    var insert1 = "";
    var insert0 = "";
    var insert2 = [];
    console.log(JSON.parse(addSqlParams))
  		for(let x in JSON.parse(addSqlParams)){
  			insert1 += ","+x
  			insert0 += ",?"
  			insert2.push(JSON.parse(addSqlParams)[x])
  		}
  		insert1 = insert1.substr(1)
  		insert0 = insert0.substr(1)
  		let addSql = "INSERT INTO comments("+insert1+") VALUES("+insert0+")"
  		console.log(addSql)
  		connection.query(addSql,insert2,function (err, result) {
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
app.get('/drivers/api2', function(req, res) {
	var sql = 'SELECT * FROM drivers where areaid='+req.query.id;
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
app.get('/drivers/api', function(req, res) {
	var sql = 'SELECT * FROM drivers where id='+ req.query.id;
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


app.get('/hotels/api', function(req, res) {
	var sql = 'SELECT * FROM hotel where id='+ req.query.id;
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

app.get('/hotels/api2', function(req, res) {
	var sql = 'SELECT * FROM hotel where areaid='+req.query.id;
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
//查导游
app.get('/guides/api2', function(req, res) {
	var sql = 'SELECT * FROM tour_guides where areaid='+req.query.id;
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
app.get('/guides/api', function(req, res) {
	var sql = 'SELECT * FROM tour_guides where id='+ req.query.id;
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

//设置
app.post('/mycenter/set', function (req, res) {
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
    var tex = ''
    console.log(JSON.parse(addSqlParams))
  		var tex = ''
    for (let x in  JSON.parse(addSqlParams)){
    		if(x == "id" || x == "longimageList"){
    			
    		}else{
    			tex +=", `"+x+"` = '"+JSON.parse(addSqlParams)[x]+"'"
    		}
    }
    tex = tex.substr(1)
    var updataSql = "UPDATE user SET "+ tex +" WHERE `id` = "+JSON.parse(addSqlParams).id
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
	     res.send(data);
		})
  });
})


app.get('/scenic/api', function (req, res) {
	//查
	console.log(req.query.type)
	if(req.query.type != 0){
		var  sql = 'SELECT * FROM scenic_spot_second where type='+ req.query.type;
	}else{
		var  sql = 'SELECT * FROM scenic_spot_second'
	}
//	var  sql = 'SELECT * FROM scenic_spot_second where type='+ req.query.type;
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

//点赞
app.get('/scenic/price', function (req, res) {
//	console.log(req.query.type)
	var	sql = ''
	if(req.query.type ==1){
		sql = "UPDATE scenic_spot_second SET praise = praise+1 WHERE id = "+req.query.id
	}
	console.log(sql)
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

//收藏
app.get('/scenic/Collection', function (req, res) {
//	console.log(req.query.type)
	console.log(req.query)
	var	sql = ''
	sql = "UPDATE user SET scenicarr_id = '"+req.query.sid+"' WHERE id = "+req.query.id
	console.log(sql)
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


//列表
app.get('/Collection/list', function (req, res) {
//	console.log(req.query.type)
	console.log(req.query)
	var	sql = ''
	sql = 'SELECT * FROM `scenic_spot_second` WHERE id in ('+req.query.sid+')'; 
	console.log(sql)
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



app.get('/scenic/detail', function (req, res) {
	//查
	var  sql = 'SELECT * FROM scenic_spot_second where id='+ req.query.id;
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





app.get('/user/info', function (req, res) {
	//查
	var  sql = 'SELECT * FROM user where id='+ req.query.id;
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


app.get('/comments/api', function (req, res) {
	//查
	var  sql = 'SELECT * FROM comments where sid='+ req.query.sid;
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
     var  sql = 'SELECT * FROM user WHERE username="'+dataObject.username+'";';
     connection.query(sql,function (err, result) {
			if(err) {
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			console.log(result[0]);
			if(result[0].password && result[0].password == dataObject.password){
				var data = {
					"code": 0,
					"data": result[0]
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
    var  addSql = 'INSERT INTO user(username,password,photo) VALUES(?,?,?)';
		console.log(addSqlParams)
		addSqlParams.push('pic/avatar.gif')
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
