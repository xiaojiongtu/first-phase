const express=require('express');
const mysql=require('mysql');
const uuid=require('uuid/v4');
const crypto=require('crypto');


let server=express();
server.listen(8080);
let db=mysql.createPool({host:'localhost',port:3306,user:'root',password:'',database:'20171229'});

//接口
//1.检查数据是否合理
server.get('/reg',(req,res,next)=>{
	let {user,pass}=req.query;
	if(!user||!pass){
		res.send({code:1,msg:'用户名和密码不能为空'})
	}else if(!/^\w{6,32}$/g.test(user)){
		res.send({code:1,msg:'用户名不合法'})
	}else if(!/^.{6,}$/g.test(pass)){
		res.send({code:1,msg:'密码最少6位'})
	}else {
		next();
	}
});

//2.有没有这个用户
server.get('/reg',(req,res,next)=>{
	let {user,pass}=req.query;
	db.query(`SELECT * FROM user WHERE username='${user}'`,(err,data)=>{
		if(err){
			res.send({code:1,msg:'数据库有误1'})
		}else if(data.length>0){
			res.send({code:1,msg:'用户名已存在'})
		}else{
			next()
		}
	});
});
//3.生成uuid ,并检测是否存在
server.get('/reg',(req,res,next)=>{
	nextId();
	function nextId(){
		let id=uuid().replace(/\-/g,'');
		db.query(`SELECT * FROM user WHERE ID='${id}'`,(err,data)=>{
			if(err){
				res.send({code:1,msg:'数据库有误1'})
			}else if(data.length>0){
				nextId();
			}else{
				req._uuid=id;
				next();
			}
		})
	}
});
//4.写入数据库
server.get('/reg',(req,res,next)=>{
	let {user,pass}=req.query;
	let md5=crypto.createHash('md5');
	pass=md5.digest('hex');
	db.query(`INSERT  INTO user (ID,username,pass) VALUES('${req._uuid}','${user}','${pass}')`,(err,data)=>{
		if(err){
			res.send({code:1,msg:'数据库有误2'});
			console.log(err)
		}else{
			res.send({code:0,msg:'注册成功'})
		}
	});
});

