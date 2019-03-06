const mysql=require('koa-mysql');

const  db=mysql.createPool({
	host:'localhost',
	port:3306,
	user:'root',
	password:'',
	database:'anjuke'
});
let _q=db.query.bind(db);
db.query=function(sql){
	return new Promise((resolve,reject)=>{
       let fn=_q(sql);
       fn((err,data)=>{
       	   if(err){
       	   	 reject(err);
		   }else {
       	   	 resolve(data)  //返回的data是数组
		   }
	   })
	})
};
module.exports=db;

