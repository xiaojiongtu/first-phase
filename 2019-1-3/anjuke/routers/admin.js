const express=require('express');
const config=require('../config');
const common=require('../libs/common');

let admin_router=express.Router();
module.exports=admin_router;

//进入所有与admin相关的页面之前，都要校验用户身份，如果没有登录-----》去登录(admin/login)
//所有的进入admin的 页面都走这个方法除了login
admin_router.use((req,res,next)=>{
	if(!req.session['admin_ID']&&req.url!=='/login'){
 		res.redirect('/admin/login');
	}else {
 		next();
	}
 });

//展现login页面
admin_router.get('/login',(req,res)=>{
  	 res.render('login',{error_msg:''});
  });

//提交了一个请求
admin_router.post('/login',(req,res)=>{
	//bodyparser解析了post数据放在body
	let{username,password}=req.body;
	//判断两次
	if(config.root_username===username){
		if(config.root_password===common.md5(password)){
			console.log('超级管理员登录');
			req.session['admin_ID']=1;
			res.redirect('/admin/')
		}else{
			showError('用户名或密码错误');
		}
	}else{
		//普通管理员
		req.db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
			 if(err){
				 showError('数据库有误，请重新输入');
				 console.log(err);
			 }else if(data.length===0){
				 showError('用户名或密码错误')
			 }else{
			 	if(data[0].password===common.md5(password)){
					console.log('普通管理员登录成功');
					req.session['admin_ID']=data[0].ID;
					res.redirect('/admin/');
				}else{
					showError('用户名或密码错误')
				}
			 }
		})
	}
	function showError(msg) {
		res.render('login',{error_msg:msg});
	}
});

 admin_router.get('/',(req,res)=>{
	res.redirect('/admin/house');
});
 admin_router.get('/house',(req,res)=>{
 	req.db.query(`SELECT * FROM admin_table`,(err,data)=>{
 		if(err){
 			res.sendStatus(500)
		}else{
			res.render('index',{data});
		}
	})

});




