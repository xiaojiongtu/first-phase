const router=require('../libs/router');

let users={};

router.on('/login',(req,res)=>{
   let {user,pass}=req.query;
   if(!users[user]){
   	  res.send({
		  code:1,
		  msg:'用户名已存在'
	  });
	  res.end()
   }else if(users[user]!=pass){
	   res.send({
		   code:1,
		   msg:'用户名或者密码错误'
	   });
	   res.end();
   }else {
	   res.send({
		   code:0,
		   msg:'登录成功'
	   });
	   res.end();
   }
});

router.on('/reg',(req,res)=>{
	let {user,pass}=req.query;
   if(users[user]){
	   res.send({
		   code:1,
		   msg:'用户名已存在'
	   });
	   res.end();
   }else{
   	 users[user]=pass;
   	 res.end();
   }
});
