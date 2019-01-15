const express=require('express');
const consolidate=require('consolidate');
const mysql=require('mysql');
const fs=require('fs');
const pug=require('pug');


let server=express();
server.listen(8080);

let db=mysql.createPool({host:'localhost',user:'root',password:'',database:'20171229',port:'3306'});

//×
//server.use(consolidate);

//1.选择一种模板引擎
server.engine('html', consolidate.ejs);
//2.指定模板文件的扩展名
server.set('view engine', 'pug');
//3.指定模板文件的路径
server.set('views', './template_pug');

server.get('/', (req, res)=> {
	//1.有没有结果文件，有几不需要再编译一次
        fs.stat('./pug_cache/1',(err,stat)=>{
        	let oDate=new Date();
        	oDate.setTime(oDate.getTime()-10*60*1000);
        	if(err||stat.ctime.getTime()<oDate.getTime()){
        		//如果没有，重新渲染
				renderAndWrite()
			}else {
        		let rs=fs.createReadStream('./pug_cache/1');
        		rs.pipe(res);
        		rs.on('error',err=>{
        				//没有-渲染
						renderAndWrite()
				});
			}
		});
	//2.如果没有就编译
	function renderAndWrite() {
		let str = pug.renderFile('./template_pug/1.pug', {
			arr: ['34', '3'],
			foot: '<strong>底部</strong>',
			catas: ['国际', '国内', '军事', '娱乐']
		});

		fs.writeFile('./pug_cache/1', str, err => {
			res.send(str);
			res.end();
		})
	}
});


