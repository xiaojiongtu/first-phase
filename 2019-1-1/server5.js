const express=require('express');
const consolidate=require('consolidate');
const mysql=require('mysql');
const fs=require('fs');
const ejs=require('ejs');


let server=express();
server.listen(8080);

let db=mysql.createPool({host:'localhost',user:'root',password:'',database:'20171229',port:'3306'});

//×
//server.use(consolidate);

//1.选择一种模板引擎
server.engine('html', consolidate.ejs);
//2.指定模板文件的扩展名
server.set('view engine', 'ejs');
//3.指定模板文件的路径
server.set('views', './template');

server.get('/', (req, res)=> {

	fs.stat('./render_cache/3',(err,stat)=>{
        if(err){
        	//不存在
			renderAndWrite();
			console.log('文件不存在');
		}else {
        	let rs=fs.createReadStream('./render_cache/3');
        	rs.pipe(res);

			rs.on('error',err=>{
				renderAndWrite();
			})
		}
	});

	function renderAndWrite(){
		db.query(`SELECT * FROM user`,(err,data)=>{
			if(err){
				res.sendStatus(500);
				res.end();
			}else {
				ejs.renderFile('./template/4.ejs',{arr:data,foot: '<strong>底部</strong>aaa', catas:['国际','国内','军事',
							'娱乐']}, (err,result)=>{
									fs.writeFile('./render_cache/3',result,err=>{
										res.send(result);
										res.end();
									})
			         });

			}
		})
	}
});


